<h1 align="center">
🌐 Tique App
</h1>

> Tique App is a Full Stack implementation in MongoDB, Express, React and Node Js.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## Clone or Download

```
$ git clone https://github.com/ronaldidro/tique-app.git
$ npm i
```

## Project Structure

```
.
├── api/
│   ├── controllers/
│   ├── models/
│   ├── test/
│   ├── utils/
│   ├── .env (secret session environment)
│   ├── app.js
│   ├── index.js
│   ├── jest.config.js
│   ├── mongo.js
│   └── package.json
├── app/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── feedback/
│   │   │   ├── fields/
│   │   │   ├── icons/
│   │   │   ├── market/
│   │   │   ├── media/
│   │   │   └── overlay
│   │   ├── hooks/
│   │   ├── reducers/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── market/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── store.js
│   ├── db.json
│   └── package.json
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── package.json
└── README.md
```

# Usage

## Prerequisites

- [Mongo DB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^16.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

## Full Stack usage (PORTS 3001 and 300)

### Prepare your secret

(You need to add a credentials in .env)

```
// in the root level
$ cd api
$ echo "MONGODB_URI=YOUR_MONGODB_URI" >> src/.env
$ echo "TEST_MONGODB_URI=YOUR_TEST_MONGODB_URI" >> src/.env
$ echo "SECRET=YOUR_SECRET_KEY" >> src/.env
$ echo "PORT=YOUR_DEFAULT_PORT" >> src/.env
```

### Start

```
// in the root level
$ npm i        // npm install packages
$ npm run dev  // server and client run locally
```

## Server side usage (PORT 3001)

```
// in the root level
$ cd api        // go to server folder
$ npm run dev   // run it locally
```

## Client side usage (PORT 3000)

```
// in the root level
$ cd app      // go to client folder
$ npm start   // run it locally
```

## Deploy Server to [Railway](https://railway.app/)

```
// in the root level
$ npm i -g @railway/cli        // just once
$ railway login
$ railway link your-project-id //the project ID is taken from the Project Setup page.

// enter your required environment variables
$ railway variables set MONGODB_URI=<YOUR_MONGODB_URI>
$ railway variables set SECRET=<YOUR_SECRET_KEY>
$ railway variables // verify that the variables are set correctly via your linked project

$ npm run deploy:full or railway up  // deploy your project
$ npm run logs or railway logs  // view deploy logs
```

# Dependencies (tech stacks)

| Client side              | Server side                       |
| ------------------------ | --------------------------------- |
| axios: ^0.27.2           | bcrypt: ^5.0.1                    |
| chakra-ui: ^2.2.0        | cross-env: ^7.0.3                 |
| prop-types: ^15.8.1      | cors: ^2.8.5                      |
| react: ^18.1.0           | dotenv: ^16.0.1                   |
| react-dom: ^18.1.0       | express: ^4.18.0                  |
| react-redux: ^8.0.2      | jsonwebtoken: ^8.5.1              |
| react-router-dom: ^6.3.0 | mongoose: ^6.3.3                  |
| redux: ^4.2.0            | morgan: ^1.10.0                   |
| formik: ^2.2.9           | mongoose-unique-validator: ^3.0.0 |

## Bugs or comments

[Create new Issues](https://github.com/ronaldidro/tique-app/issues) (preferred)

Email me: rondiazidro@gmail.com (welcome, say hi)

## Author

[ronaldidro](https://github.com/ronaldidro)
