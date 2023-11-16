
1 - Rode o comando **npm install** para instalar as dependências do projeto.

Caso utilizem o deploy pelo Lambda Aws que é o recomendado por nós:

2- Será necessário configurar um usuário com liberação dentro do AWS Amazon, https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

3 - Informar os dados da configuração no cmd: serverless config credentials --provider aws --key <chave> --secret <segredo>

4- Caso prefiram um servidor mais próximo, o arquivo serverless.yml possui o región que pode ser alterada  para alguma das outras localidades do AWS que fiquem mais próximas, também é possível alterar o nome da aplicação alterando o service do serverless.yml.

5 - Npm install --save serverless-http

6 - sls deploy fará o deploy criando a rota no lambda da AWS e no gateway já interpretando a aplicação node.

7 - Como o .env não sobe para o lambda da AWS, é necessário ir no console do usuário AWS -> lambda -> clicar na função que subiram -> configuração -> variáveis de ambiente -> adicionar todas as variáveis que estão no .env

8 - Adicionar a rota completa que foi gerada no amazon e alterar no Config.json e index.html, 
ex :
Config.json:
https://enpoint-gerado-na-amazon/create-deal
https://enpoint-gerado-na-amazon/on-save
https://enpoint-gerado-na-amazon/on-publish
https://enpoint-gerado-na-amazon/on-validate
https://enpoint-gerado-na-amazon/on-stop

Caso façam o deploy por outro formato, é necessário:
1- abrir o app.js

2- remover o trecho de código const serverless = require('serverless-http');

3 - Descomentar

// app.listen(3000);

4 - alterar 

module.exports.handler = serverless(app);
para 
module.exports = app;

5 - Dessa forma a aplicação volta a funcionar como um node padrão e pode ser integrado da forma que desejarem em outro deploy.

Fazer as configurações no Marketing CLoud: (passo a passo na doc)