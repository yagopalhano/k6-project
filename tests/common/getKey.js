import http from 'k6/http';
import { check } from 'k6';

export function getKey(data) {
    const url = `${data.SETTINGS.baseUrlAutocaptura}/convite/solicitar`
    const headers = {
        'Authorization': data.TOKEN,
        'Content-Type': 'application/json'
    }
    const body = `{
        "chave":"",
        "logo": "",
        "cpf": "",
        "nome": " ",
        "email":"",
        "validade":"",
        "celular": "",
        "via":"email",
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
    return (res.json('key'));
}

