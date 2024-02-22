#Journey Builder Custom Activity

Este codigo cria uma atividade customizada dentro do Marketing Cloud Journey Builder para a abertura de tickets dentro do Zendesk.

## Instruções de Configuração e Implantação

Este documento fornece um guia passo a passo para configurar e implantar o projeto.

## Configuração do Projeto

1. Execute o comando `npm install` para instalar as dependências do projeto.

## Implantação com Lambda AWS (Recomendado)

Se optar pelo deploy via Lambda AWS, siga estas etapas:

1. É necessário configurar um usuário com permissões adequadas dentro do AWS Amazon. Consulte a [documentação oficial](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) para orientações sobre como configurar as credenciais.

2. Informe os dados da configuração no terminal utilizando o comando: `serverless config credentials --provider aws --key <chave> --secret <segredo>`

3. Caso prefira um servidor mais próximo, o arquivo `serverless.yml` possui a região que pode ser alterada para uma das outras localidades do AWS que fiquem mais próximas. Também é possível alterar o nome da aplicação alterando o serviço do `serverless.yml`.

4. Execute o comando `npm install --save serverless-http`.

5. O comando `sls deploy` fará o deploy, criando a rota no Lambda da AWS e no Gateway, já interpretando a aplicação node.

6. Como o arquivo `.env` não é implantado no Lambda da AWS, é necessário configurar as variáveis de ambiente manualmente. Acesse o console do usuário AWS, vá para Lambda, clique na função implantada, vá para Configuração > Variáveis de Ambiente e adicione todas as variáveis que estão no `.env`.

7. Adicione a rota completa que foi gerada no Amazon e altere no `Config.json` e `index.html`, Por exemplo:

    Config.json:
    - https://enpoint-gerado-na-amazon/create-deal
    - https://enpoint-gerado-na-amazon/on-save
    - https://enpoint-gerado-na-amazon/on-publish
    - https://enpoint-gerado-na-amazon/on-validate
    - https://enpoint-gerado-na-amazon/on-stop

## Implantação por Outro Formato

Se optar por implantar de outra forma:

1. Abra o arquivo `app.js`.

2. Remova o trecho de código: `const serverless = require('serverless-http');`

3. Descomente: `// app.listen(3000);`

4. Altere:

    ```
    module.exports.handler = serverless(app);
    ```

    para 

    ```
    module.exports = app;
    ```

    Dessa forma, a aplicação voltará a funcionar como um nó padrão e poderá ser integrada da forma desejada em outro deploy.

## Configurações no Marketing Cloud

Siga o passo a passo na documentação para configurar o Marketing Cloud.
