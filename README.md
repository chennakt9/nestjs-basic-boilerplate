# Nestjs microservices boilerplate

A simple nestjs project using `@nestjs/microservices` with rabbitmq for interservice communication. `mongodb` and `rabbitmq` will be used as dockerized containers. Also passportjs is used for authentication and to protect the routes using AuthGuards

### Prerequisites

I assume node, git and docker are already installed in your system.If not they can be easily installed from their official website.</br>

> Optional: Install mongodb compass

Clone this repo using

```
$ git clone https://github.com/chennakt9/nestjs-basic-boilerplate.git
```

### Usage

Start mongodb and rabbitmq using docker

```
$ docker-compose up
```

U can verify that docker has stared:

1. check rabbitmq from http://localhost:15672/ (username: guest, password: guest)
2. verify mongodb by opening mongodb compass (uri : mongodb://localhost:27018)

> Note: You can start docker as a background process by passing -d flag (docker-compose up -d)

**Starting microservices**
Start each service in a separate terminal (auth / billing / orders)

```
terminal-1- $ npm run start:dev auth
terminal-2- $ npm run start:dev billing
terminal-3- $ npm run start:dev orders
```

> ##### Note: You can start all the services at once
>
> 1. Add each service in docker-compose.yml by exposing the relevant ports if needed. (uncomment the code in docker-compose.yml)
> 2. Use pm2

#### Testing in postman

- POST / http://localhost:3001/auth/register
  {
  "email": "test1@example.com",
  "password": "1234"
  }
- POST / http://localhost:3001/auth/login
  {
  "email": "test1@example.com",
  "password": "1234"
  }
- GET / http://localhost:3000/order
- POST / http://localhost:3000/order
  {
  "name": "test 11",
  "price": 3011,
  "phoneNumber": "+919876543210"
  }

#### Database

1. Abstracted the ORM to reduce duplicate code, also db driver can be easily replaced with TypeOrm or something like that (Abstract repository pattern)
2. Each service has its own database (use this iff you can efficiently query data across different db)
3. Added DB Transactions (transactions will work after adding a mongodb replica-set)

## Demo

![Demo](https://github.com/chennakt9/nested-commenting-system/blob/master/demo.gif)

## Authors

- **chennakt9** - _Initial work_ - [chennakt9](https://github.com/chennakt9)
