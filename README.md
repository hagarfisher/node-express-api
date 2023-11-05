# Node Express API

Node Express API is a project that implements a users API with various operations for managing user data. This API is built using Node.js and the Express.js framework and features authentication using JWT tokens. Users can interact with the API to perform the following operations:

1. **Reading All Users from a Specific Page**
   - **Route:** `/getUsers/{page}`
   - **Method:** GET

2. **Read Specific User**
   - **Route:** `/getUser/{id}`
   - **Method:** GET

3. **Create a New User**
   - **Route:** `/createUser`
   - **Method:** POST

4. **Update User**
   - **Route:** `/updateUser/{id}`
   - **Method:** PUT

5. **Delete User**
   - **Route:** `/deleteUser/{id}`
   - **Method:** DELETE

6. **Register**
   - **Route:** `/register`
   - **Method:** POST
   - **Description:** Register a new user by providing their email and password in the request body as JSON (`{"email": "user@example.com", "password": "password123"}`).

7. **Login**
   - **Route:** `/login`
   - **Method:** POST
   - **Description:** Log in by providing the user's email and password in the request body as JSON (`{"email": "user@example.com", "password": "password123"}`).


## Authentication

This API implements authentication using JSON Web Tokens (JWT). To access the protected routes, you must include an 'Authorization' header with a Bearer token.

To obtain a JWT token, you need to log in by providing your credentials using the `/login` endpoint. The API will then issue a token that you can use for authenticated requests.

## Getting Started

To run this project, follow these steps:

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/hagarfisher/node-express-api.git

2. Navigate to the project directory:
   ```shell
   cd node-express-api

3. Install project dependencies using npm:
   ```shell
   npm install

4. Create a .env file based on the provided .env.example file and configure the necessary environment variables, including your secret key for JWT token generation.

5. Start the API server:
   ```shell
   npm run dev
   ```
   Or
   ```shell
   npm run build
   npm run start
   ```

The API should now be running and accessible at http://localhost:8080.

## Environment Variables

The .env file should contain the following environment variables:
- PORT
- BASE_API_URL
- EXTERNAL_API_URL
- JWT_SECRET

## API Usage
Ensure you include the 'Authorization' header with a Bearer token for authentication where required.
### Example Request:
To retrieve all users from a specific page:
```shell
curl -XGET -H 'Authorization: Bearer your-jwt-token' 'http://localhost:8080/getUsers/2'
```

### Example Response:
```json
[
    {
        "id": 1,
        "email": "george.bluth@reqres.in",
        "first_name": "George",
        "last_name": "Bluth",
        "avatar": "https://reqres.in/img/faces/1-image.jpg"
    },
    {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
    }
]
```
