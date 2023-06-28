import http from 'k6/http';
import { Counter, Rate } from "k6/metrics";
import { check, sleep, group } from 'k6';
export let PostSolicitar = [
    postSolicitar
];

let myErrorCounter = new Counter("my_error_counter");
let myRate = new Rate("my_rate");


function postSolicitar(data) {

    group('POST - Solicitar Convite', function () {
        const url = `${data.SETTINGS.baseUrlAutocaptura}/convite/solicitar`
        const headers = {
            'Authorization': data.TOKEN,
            'Content-Type': 'application/json'
        }
        const body = `{
        "chave":"",
        "logo": "",
        "cpf": "",
        "nome": "",
        "email":"",
        "validade":"",
        "celular": "",
        "via":"",
        "cnpj":"",
        "cpfPromotor":"",
        "cpfVendedor":"",
        "codigoProcessoSistema": "",
        "idEmpregado": "",
        "idProposta": "",
        "canal":""
    }`
        let res = http.post(url, body, { headers: headers });
        check(res, { 'status was 200': (r) => r.status == 200 });
        if (res.status === 400) {
            myErrorCounter.add(1)
            myRate.add(res.error_code);
        }
        sleep(1);
    });

}
