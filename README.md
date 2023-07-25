# Motors Shop

Motors Shop é uma Api desenvolvida para a venda de veículos facilitando a divugação, procura e compra do veículo desejado.

<br>

# **Inicializando a instalação**

Utilize o comando abaixo para instalar todas as dependẽncias do projeto:

```
yarn install
```

<br>

**Configure as variáveis de ambiente no arquivo .env** utilizando as suas credenciais para se conectar ao seu banco de dados local.

Utilize o comando abaixo para inicializar a aplicação:

```
yarn dev
```

<br>

## 📌 Features

- [x] Cadastro de usuário
- [x] Update de usuário
- [x] Listagem de usuário
- [x] Exclusão de usuário
- [x] Login de usuário com geração de token
- [x] Cadastro de anúncio
- [x] Update de anúncio
- [x] Listagem de um anúncio
- [x] Listagem de todos os anúncios
- [x] Arquivamento de anúncio
- [x] Exclusão de anúncio
- [x] Criação de comentário
- [x] Update de comentário
- [x] Exclusão de comentário
- [x] Recuperação de senha

# 📋 Documentação

## Base url:

---

## Rotas que não precisam de autenticação

### Cadastro de usuários

- #### POST /users

Body

```json
{
  "name": "Helbert Abreu",
  "email": "helbert@email.com",
  "cpf": "12345678999",
  "password": "12345678",
  "phoneNumber": "31999831125",
  "dateOfBirth": "19810311",
  "typeOfAccount": "anunciante",
  "address": {
    "cep": "31130470",
    "city": "Belo Horizonte",
    "state": "MG",
    "street": "Praça Maurício da Veiga",
    "number": "50",
    "complement": "apto 110"
  }
}
```

Retorno esperado - 201

```json
{
  "updatedAt": "2023-07-20T14:20:04.518Z",
  "createdAt": "2023-07-20T14:20:04.518Z",
  "isActive": true,
  "id": "b1362d9b-8e09-41f7-9997-da805be58c19",
  "address": {
    "cep": "31130470",
    "state": "mg",
    "city": "belo horizonte",
    "street": "praça maurício da veiga",
    "number": "50",
    "complement": "apto 110",
    "user": "b1362d9b-8e09-41f7-9997-da805be58c19",
    "id": "10d28126-e248-4226-bc99-80c1f714088d",
    "createdAt": "2023-07-20T14:20:04.660Z",
    "updatedAt": "2023-07-20T14:20:04.660Z"
  },
  "typeOfAccount": "anunciante",
  "description": null,
  "dateOfBirth": "19810311",
  "phoneNumber": "31999831125",
  "cpf": "12345678999",
  "email": "helbert@email.com",
  "name": "helbert abreu"
}
```

Possíveis erros

Retorno esperado - 400

```json
{
  "error": [
    "name is a required field",
    "email is a required field",
    "cpf is a required field",
    "password is a required field",
    "phoneNumber is a required field",
    "dateOfBirthday is a required field",
    "typeOfAccount is a required field",
    "address.cep is a required field",
    "address.city is a required field",
    "address.state is a required field",
    "address.street is a required field"
  ]
}
```

```json
{
  "message": "Email is already exists"
}
```

```json
{
  "message": "Cpf is already exists"
}
```

### Listagem de anúncios

- #### GET /posts

Body

```json

```

Retorno esperado - 200

```json
{
  "message": "There is no registered ad yet"
}
```

```json
[
  {
    "user": {
      "description": "Sou um novo vendedor por aqui.",
      "phoneNumber": "31999831125",
      "name": "helbert abreu",
      "email": "helbert@email.com",
      "id": "b1362d9b-8e09-41f7-9997-da805be58c19"
    },
    "images": [],
    "imageCap": "Um teste",
    "updatedAt": "2023-07-20T14:41:03.823Z",
    "createdAt": "2023-07-20T14:41:03.823Z",
    "isActive": true,
    "isGoodPurchase": true,
    "description": null,
    "kilometers": "140000",
    "color": "prata",
    "tablePriceFiper": "24000",
    "price": "15000",
    "fuelType": "flex",
    "year": "2010",
    "model": "palio fire",
    "mark": "fiat",
    "id": "eba3ab25-9165-4f1b-8ba5-c4d676a625d3"
  }
]
```

### Listagem de um anúncio

- #### GET /posts/:id

```json
{
  "user": {
    "description": null,
    "phoneNumber": "31999831125",
    "name": "helbert abreu",
    "email": "helbert@email.com",
    "id": "b1362d9b-8e09-41f7-9997-da805be58c19"
  },
  "images": [],
  "imageCap": "Um teste",
  "updatedAt": "2023-07-20T14:41:03.823Z",
  "createdAt": "2023-07-20T14:41:03.823Z",
  "isActive": true,
  "isGoodPurchase": true,
  "description": null,
  "kilometers": "140000",
  "color": "prata",
  "tablePriceFiper": "24000",
  "price": "15000",
  "fuelType": "flex",
  "year": "2010",
  "model": "palio fire",
  "mark": "fiat",
  "id": "eba3ab25-9165-4f1b-8ba5-c4d676a625d3"
}
```

## Rotas que necessitam de autenticação

Bearer token

```JavaScript
{
    headers : {"Authorization": `Bearer ${token}`}
}
```

### Listagem de todos os usuários

- #### GET /users

Body

```json

```

Retorno esperado - 200

### Listagem de um usuário

- #### GET users/:id

```json
{
  "id": "1584aa38-f289-4427-a837-717b834f21f8",
  "name": "helbert abreu",
  "email": "helbert@email.com",
  "cpf": "06928217677",
  "phoneNumber": "31992431024",
  "dateOfBirth": "1981-03-11T03:00:00.000Z",
  "description": "Sou um novo vendedor por aqui.",
  "typeOfAccount": "anunciante",
  "isActive": true,
  "createdAt": "2023-07-11T17:06:59.440Z",
  "updatedAt": "2023-07-18T14:44:28.200Z",
  "address": {
    "id": "96e58f6a-880f-4423-a532-91650f05de4f",
    "cep": "31130470",
    "state": "mg",
    "city": "belo horizonte",
    "street": "rua indianópolis",
    "number": "527",
    "complement": "apto 1105",
    "createdAt": "2023-07-11T17:06:59.575Z",
    "updatedAt": "2023-07-11T17:07:26.134Z"
  },
  "posts": []
}
```

### Update de usuário

- #### PATCH users/:id

Body

```json
{
  "name": "Helbert Abreu",
  "email": "helbert@email.com",
  "cpf": "12345678999",
  "password": "12345678",
  "phoneNumber": "31999831125",
  "dateOfBirth": "19810311",
  "typeOfAccount": "anunciante",
  "description": "Sou um novo vendedor por aqui.",
  "address": {
    "cep": "31130900",
    "city": "Belo Horizonte",
    "state": "MG",
    "street": "Rua Mirasol",
    "number": "527"
  }
}
```

Retorno esperado - 204

```json
{
  "updatedAt": "2023-07-20T14:55:47.905Z",
  "createdAt": "2023-07-20T14:20:04.518Z",
  "isActive": true,
  "id": "b1362d9b-8e09-41f7-9997-da805be58c19",
  "address": {
    "complement": "apto 110",
    "number": "527",
    "street": "rua mirasol",
    "state": "mg",
    "city": "belo horizonte",
    "cep": "31130900"
  },
  "typeOfAccount": "anunciante",
  "description": "Sou um novo vendedor por aqui.",
  "dateOfBirth": "19810311",
  "phoneNumber": "31999831125",
  "cpf": "12345678999",
  "email": "helbert@email.com",
  "name": "helbert abreu"
}
```

### Exclusão de usuário

- #### DELETE users/:id

Body

```json

```

Retorno esperado - Status 204

```json

```

### Criação de anúncio

- #### POST /posts

Body

```json
{
  "mark": "Fiat",
  "model": "Palio Fire",
  "year": "2010",
  "fuelType": "Flex",
  "price": "15000",
  "tablePriceFiper": "24000",
  "color": "Prata",
  "kilometers": "140000",
  "imageCap": "Um teste",
  "images": "link"
}
```

Retorno esperado - Status 201

```json
{
  "user": {
    "description": null,
    "phoneNumber": "31999831125",
    "name": "helbert abreu",
    "email": "helbert@email.com",
    "id": "b1362d9b-8e09-41f7-9997-da805be58c19"
  },
  "imageCap": "Um teste",
  "updatedAt": "2023-07-20T14:41:03.823Z",
  "createdAt": "2023-07-20T14:41:03.823Z",
  "isActive": true,
  "isGoodPurchase": true,
  "description": null,
  "kilometers": "140000",
  "color": "prata",
  "tablePriceFiper": "24000",
  "price": "15000",
  "fuelType": "flex",
  "year": "2010",
  "model": "palio fire",
  "mark": "fiat",
  "id": "eba3ab25-9165-4f1b-8ba5-c4d676a625d3"
}
```

### Update de anúncio

- #### PATCH /posts/:id

Body

```json
{
  "mark": "Honda",
  "model": "CRV",
  "year": "2011",
  "fuelType": "Gasolina",
  "price": "48000",
  "tablePriceFiper": "50000",
  "color": "Prata",
  "kilometers": "140000",
  "imageCap": "Um teste",
  "images": "link"
}
```

Retorno esperado -Status 204

```json
{
  "user": {
    "description": "Sou um novo vendedor por aqui.",
    "phoneNumber": "31992431024",
    "name": "helbert abreu",
    "email": "helbert@email.com",
    "id": "1584aa38-f289-4427-a837-717b834f21f8"
  },
  "images": [],
  "imageCap": "Um teste",
  "updatedAt": "2023-07-19T16:11:17.166Z",
  "createdAt": "2023-07-19T16:10:09.351Z",
  "isActive": false,
  "isGoodPurchase": false,
  "description": null,
  "kilometers": "140000",
  "color": "prata",
  "tablePriceFiper": "50000",
  "price": "48000",
  "fuelType": "gasolina",
  "year": "2011",
  "model": "crv",
  "mark": "honda",
  "id": "769538e2-d276-4439-b2e2-762d033a6b5e"
}
```

### Arquivamento de anúncio

- #### PATCH /posts/:id/delist

Body

```json

```

Retorno esperado - Status 200

```json
{
  "user": {
    "description": "Sou um novo vendedor por aqui.",
    "phoneNumber": "31992431024",
    "name": "helbert abreu",
    "email": "helbert@email.com",
    "id": "1584aa38-f289-4427-a837-717b834f21f8"
  },
  "images": [],
  "imageCap": "Um teste",
  "updatedAt": "2023-07-19T16:11:17.166Z",
  "createdAt": "2023-07-19T16:10:09.351Z",
  "isActive": false,
  "isGoodPurchase": false,
  "description": null,
  "kilometers": "140000",
  "color": "prata",
  "tablePriceFiper": "50000",
  "price": "48000",
  "fuelType": "gasolina",
  "year": "2011",
  "model": "crv",
  "mark": "honda",
  "id": "769538e2-d276-4439-b2e2-762d033a6b5e"
}
```

### Exclusão de anúncio

- #### DELETE /posts/:id

Body

```json

```

Retorno esperado - Status 204

```json

```

Possíveis Erros

Status - 400

```json
{
  "message": [
    "mark is a required field",
    "model is a required field",
    "year is a required field",
    "fuelType is a required field",
    "price is a required field",
    "tablePriceFiper is a required field",
    "color is a required field",
    "kilometers is a required field",
    "imageCap is a required field"
  ]
}
```

Status - 401

```json
{
  "message": "You don't have authorization"
}
```

Status - 404

```json
{
  "message": "Post not found"
}
```

### Criação de comentário

- #### POST posts/:id/comments

Body

```json
{
  "description": "Excelente carro! Vale a pena."
}
```

Retorno esperado - Status 201

```json
{
  "description": "Excelente carro! Vale a pena.",
  "userComment": "helbert abreu",
  "userCommentId": "1584aa38-f289-4427-a837-717b834f21f8",
  "post": "325d401b-7048-49d1-9347-aa7a106f7d59",
  "id": "6d915e2f-d376-4a04-bb82-29524b641d0e",
  "createdAt": "2023-07-19T22:55:40.807Z",
  "updatedAt": "2023-07-19T22:55:40.807Z"
}
```

### Update de comentário

- #### PATCH /posts/comments/:id

Body

```json
{
  "description": "Um carro muito confortável mas com grande consumo de combustível."
}
```

Retorno esperado - Status 200

```json
{
  "userComment": "helbert abreu",
  "userCommentId": "1584aa38-f289-4427-a837-717b834f21f8",
  "createdAt": "2023-07-19T22:55:40.807Z",
  "description": "Um carro muito confortável mas com grande consumo de combustível.",
  "id": "6d915e2f-d376-4a04-bb82-29524b641d0e"
}
```

### Exclusão de comentário

- #### DELETE posts/comments/:id

Body

```json

```

Retorno esperado - Status 204

```json

```

Possíveis erros

Status - 400

```json
{
  "message": [
    "mark is a required field",
    "model is a required field",
    "year is a required field",
    "fuelType is a required field",
    "price is a required field",
    "tablePriceFiper is a required field",
    "color is a required field",
    "kilometers is a required field",
    "imageCap is a required field"
  ]
}
```

Status - 401

```json
{
  "message": "You don't have authorization"
}
```

Status - 404

```json
{
  "message": "Post not found"
}
```
