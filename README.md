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

[Postman collection](https://github.com/chennakt9/nestjs-basic-boilerplate/tree/09f4906235a704a9322168bf5bb8d303f7d36829/demo)

#### Database

1. Abstracted the ORM to reduce duplicate code, also db driver can be easily replaced with TypeOrm or something like that (Abstract repository pattern)
2. Each service has its own database (use this iff you can efficiently query data across different db)
3. Added DB Transactions (transactions will work after adding a mongodb replica-set)

## Demo

![Demo](https://github.com/chennakt9/nestjs-basic-boilerplate/blob/master/demo/nestjs-microservices-demo.gif)

## Authors

- **chennakt9** - _Initial work_ - [chennakt9](https://github.com/chennakt9)
