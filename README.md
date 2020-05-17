# Order Food

By Mohankumar
# List of Modules!

  - User Module.
  - Food Module.
  - Order MOdule.
  - Ingredients Module.
 
### Tech

Order Food Api is used to place order for Food, Developed in Node.js with Postgres DB.

* [Sawgger UI] - To visualize and interact with the API’s resources
* [node.js] - evented I/O for the backend
* [Nest. js] - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
* [Postgres] - Open source DB
* [Logger] - A Logging library to to view follwing level 'fatal', 'error', 'warn', 'info', 'debug'
* [Passport] - Passport utilities module for Nest. for User module
* [JWT] - JSON Web Token for token based Autharization
* [TypeOrm] - Object-Relational-Mapper

### Installation

Order Food requires [Node.js](https://nodejs.org/) v10+ to run.
Order Food requires Postgres v11.4 to run.
Order Food requires Nest.js v7+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm i -g @nestjs/cli
$ git clone https://github.com/mohan210782/sqashor-order-food.git
$ npm install
```

Configure DB: open .env file 

```sh
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DATABASE=DB name
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
```

DB Migration : Run the following comments to migrate the DB
```sh
$ npm run typeorm:migration:generate
$ npm run typeorm:migration:run
```

If you dont want to migrate, skip the above migration comments and create db and restore the .bak file 
```sh
$ CREATE DATABASE Dbname
$ psql -U username dbname < foodorder.pgsql
```

## Run the Application
```sh
$ npm run start
or
$ npm run start:dev
```
Verify the deployment by navigating to your server address in your preferred browser.

```sh
$ http://localhost:[ port specified in env file ]/api/
```

### Todos

 - Create new user 
 - Login 
 - Copy and paste the token in the Autharization model (located at top right)
 - then you can use all the API Endpoints



