# Executar o projeto
Para Executar o projeto basta usar o comando `k6 run main.js -e OPTIONS_SET="" -e EXECUTION=""`, informando que tipo de teste de performance gostaria de rodar no `OPTIONS_SET` e em qual ambiente no `EXECUTION`.

# Gerar script k6 a partir de um swagger.json

Após rodar o comando `npm i` bastar ter um arquivo json com o conteudo do swagger e rodar o comando `npm run convertSwaggerToK6` com isto será criado um arquivo novo chamado script.js com o código k6 necessário para rodar os testes.

# Gerar script k6 a partir de uma collection postman

Após rodar o comando `npm i` bastar ter um arquivo json exportado de uma collection do postman e rodar o comando `JSON_FILE=swagger.json npm run convertSwaggerToK6` com isto será criado um arquivo novo chamado k6-script.js com o código k6 necessário para rodar os testes.