# Duosystem NestJS Project

### Projeto NestJS com GraphQL, TypeORM, SQLite, JWT e Class-Validator

Este projeto utiliza o framework NestJS para criar uma aplicação server-side usando Node.js. A combinação de GraphQL, TypeORM (para interação com banco de dados SQLite), JWT (JSON Web Tokens) para autenticação, e Class-Validator para validação de dados proporciona uma arquitetura moderna e eficiente.

### Estrutura do Projeto

- NestJS: Um framework para construção de aplicativos Node.js altamente modular e eficiente, que utiliza conceitos do Angular para organizar a estrutura do código.

- GraphQL: Um sistema de consulta de dados eficiente e flexível que permite aos clientes solicitar exatamente os dados de que precisam.

- TypeORM: Um ORM (Object-Relational Mapping) que facilita a interação com bancos de dados relacionais usando TypeScript.

- SQLite: Um banco de dados SQL embutido, perfeito para desenvolvimento e projetos de pequena escala.

- JWT (JSON Web Tokens): Um método compacto e seguro de representar informações entre duas partes, amplamente utilizado para autenticação e autorização em APIs.

- Class-Validator: Uma biblioteca de validação para TypeScript e JavaScript que funciona perfeitamente com classes e decoradores.

### Funcionalidades Principais

1. GraphQL Endpoints:

   Consultas (queries) para buscar dados de maneira eficiente.
   Mutações (mutations) para modificar dados no servidor.

2. TypeORM Entities:

   Entidades definidas usando TypeScript para representar tabelas no banco de dados.

3. SQLite Database:

   Banco de dados leve e embutido, ideal para desenvolvimento e testes.

4. JWT Authentication:

   Geração e verificação de tokens JWT para autenticação segura.

5. Class-Validator:

   Utilização de decoradores para validar dados de entrada e garantir a integridade dos dados.

## Pré-requisitos

- Node.js e npm instalados
- Git

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/natanpereira/duosystem-nestjs-project
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd duosystem-nestjs-project
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração do Banco de Dados

Este projeto usa o SQLite como banco de dados. O arquivo de banco de dados (database.db) será criado automaticamente na pasta data durante a execução do projeto.

## Executando o Aplicativo

Execute o seguinte comando para iniciar o servidor:

```bash
npm run start
```

- O servidor estará disponível em http://localhost:3000 por padrão.

# Documentação Swagger e Autenticação JWT

### Documentação Swagger

Este projeto utiliza o Swagger para documentação da API. Para acessar a documentação, basta ir para a rota /docs após iniciar o servidor. Por exemplo, se o servidor estiver sendo executado localmente em http://localhost:3000, a documentação estará disponível em http://localhost:3000/docs.

No Swagger, você terá acesso a informações detalhadas sobre os endpoints, parâmetros de requisição, tipos de resposta e exemplos de uso. Isso facilita a compreensão e interação com a API, além de fornecer uma interface interativa para testar os endpoints diretamente do navegador.

Autenticação JWT
A autenticação JWT (JSON Web Token) é utilizada para proteger as rotas da API. A rota /docs e outras rotas sensíveis só podem ser acessadas por usuários autenticados.

Ao fazer uma solicitação autenticada, é necessário incluir um cabeçalho de autorização contendo o token JWT. O token é obtido ao fazer login com as credenciais apropriadas.

Exemplo de cabeçalho de autorização:

```bash
Authorization: Bearer SEU_TOKEN_JWT_AQUI
```

O token JWT é emitido após o processo de autenticação e deve ser incluído em todas as solicitações subsequentes para acessar rotas protegidas. Certifique-se de armazenar o token de forma segura no lado do cliente e enviá-lo adequadamente em cada solicitação autenticada.

Para obter mais detalhes sobre como autenticar e obter um token JWT, consulte a documentação da API na rota /docs e reveja as informações de autenticação fornecidas.

## Testes

Para executar os testes, use o seguinte comando:

```bash
npm run test
```

# GraphQL: Queries e Mutations

GraphQL Overview
GraphQL é uma linguagem de consulta para APIs desenvolvida pelo Facebook que oferece uma abordagem mais eficiente e flexível para obter dados do que as tradicionais APIs REST. Ela permite que os clientes solicitem apenas os dados necessários e em um formato estruturado, reduzindo a largura de banda e melhorando a eficiência da comunicação entre cliente e servidor.

### Queries no GraphQL

As queries no GraphQL são utilizadas para buscar dados. Ao contrário das APIs REST, onde você pode obter mais ou menos dados do que precisa, em uma query GraphQL, você especifica exatamente quais dados deseja receber. Isso ajuda a evitar o problema de over-fetching (receber mais dados do que o necessário) e under-fetching (não receber dados suficientes) comum em APIs REST.

Exemplo de uma query GraphQL para obter informações de um usuário:

```bash
query {
  getUser(id: 1) {
    id
    username
    email
  }
}
```

Neste exemplo, a query está pedindo ao servidor para retornar o id, username e email de um usuário específico com o ID 1.

### Mutations no GraphQL

As mutations no GraphQL são utilizadas para modificar dados no servidor. Enquanto as queries são usadas para leitura, as mutations são usadas para escrita. Elas podem ser usadas para criar, atualizar ou excluir dados.

Exemplo de uma mutation GraphQL para criar um novo usuário:

```bash
mutation {
  createUser(input: {
    username: "novousuario",
    password: "senha123"
  }) {
    id
    username
  }
}
```

Neste exemplo, a mutation está instruindo o servidor a criar um novo usuário com o username "novousuario" e a password "senha123", e então retornar o id e username do usuário recém-criado.

Em resumo, as queries são utilizadas para leitura de dados e mutations para modificação de dados no GraphQL. Essa abordagem permite uma comunicação mais eficiente entre cliente e servidor, adaptando-se às necessidades específicas de cada operação.

## Explorando a API GraphQL

Abra o navegador e acesse http://localhost:3000/graphql para acessar o Playground GraphQL. Aqui você pode interagir com a API GraphQL e explorar os diferentes pontos de extremidade.

#

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
