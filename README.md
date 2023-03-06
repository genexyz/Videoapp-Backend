# Videos Creator Platform - Full Stack Developer Assessment - Backend

In this platform video creators can upload (video URL) new videos, sign up, list the available videos and video creators. They will also have the ability to like videos and follow other video creators.

## How to set up the app locally

1.  Install the required dependencies

```
npm install
```

2.  Create a .env file in the root directory with the following variables

```
PORT=8000
DB_URL="postgresql://videoapp:videoapp@localhost:5432/videoapp"
JWT_SECRET=0282e252c80c75c68158a79c98950e77
JWT_REFRESH_SECRET=2b4df632f9402cc0c9dff8041f12aad9
```

3. To start the local database, start the docker postgreSQL process:

```
docker compose up --build
```

If you want to use another database modify the .env DB_URL variable with the connection string.

4. To start the server locally run:

```
npm run dev
```

This will start the server on http://localhost:8000/

5. To load initial values to test the app run:

```
npx sequelize-cli db:seed:all
```

## Considerations and Notes

### Deployment

The app is currently deployed online to use, the server can be found at:

```
https://videoapp-backend.herokuapp.com/
```

A cloud database already loaded with data is used in the deployment.
If you have any errors when setting up the local environment, feel free to test the client in the deployed URL.

### Users to test

To test the app you can use the following users, which are included in the seeders and are already loaded in the cloud database

```
user1@example.com - password1$
user2@example.com - password2$
```

### Testing (not fully implemented yet)

To test the app run:

```
npm run test
```

This will log in the console the result of the tests and the total app coverage of tests.

### Pub / Sub mechanism for Follows

A Pub/Sub mechanism is implemented when a Creator follows another Creator, this mechanism will log into the server terminal the action with both user's IDs.
The action is fully customizable if needed, i restricted to a simple console log.

### Renew Access Token

The Renew Access Token functionality is implemented, along with the JWT access token, a refresh token is generated and sent back to the client.
The Auth middleware then validates the state of these tokens and generates a new one if necessary.

### CORS

CORS protection is implemented, but currently allows all routes for easier testing, to add allowed origins, modify the code like this:

```
app.use(cors({
    origin: 'https://www.url.com'
}));
```

## Tech Stack

- Node.js with Express.js
- Typescript
- JWT
- PostgreSQL
- Sequelize ORM
- Jest
