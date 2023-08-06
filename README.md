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
├── .dockerignore
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── dev.Dockerfile
├── docker-compose.dev.yml
├── package.json
└── README.md
```

# Usage

## Prerequisites

- [Mongo DB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^16.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

## Set environment variables

```
# in the root level
$ touch api/.env
$ echo "MONGODB_URI=YOUR_PRD_MONGODB_URI" >> api/.env
$ echo "DEV_MONGODB_URI=YOUR_DEV_MONGODB_URI" >> api/.env
$ echo "TEST_MONGODB_URI=YOUR_TEST_MONGODB_URI" >> api/.env
$ echo "RENDER_SERVICE_ID=YOUR_RENDER_SERVICE_ID" >> api/.env
$ echo "RENDER_API_KEY=YOUR_RENDER_API_KEY" >> api/.env
$ echo "SECRET=YOUR_SECRET_KEY" >> api/.env
$ echo "PORT=YOUR_DEFAULT_PORT" >> api/.env

# in the root level
$ touch app/.env
$ echo "REACT_APP_API_URI=YOUR_API_URI" >> app/.env
```

## Dev Mode (PORTS 3001 and 3000)

### Start

```
# in the root level
$ npm i        # npm install packages
$ npm run dev  # server and client run locally
```

## Server side usage (PORT 3001)

```
# in the root level
$ cd api       # go to server folder
$ npm run dev  # run it locally
```

## Client side usage (PORT 3000)

```
# in the root level
$ cd app     # go to client folder
$ npm start  # run it locally
```

## Deploy Server to [Render](https://render.com/)

```
# in the root level, previously you must commit and push your changes
$ npm run deploy
```

## Containers

### Dev Mode

```
# build images
$ docker compose -f docker-compose.dev.yml build

# start containers
$ docker compose -f docker-compose.dev.yml up

# down containers
$ docker compose -f docker-compose.dev.yml down --volumes

```

### Production Mode

```
# build images
$ docker compose build

# start containers
$ docker compose up

# down containers
$ docker compose down --volumes

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
