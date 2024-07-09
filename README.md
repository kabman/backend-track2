# user-auth-organisation
API documentation on GitHub for user authentication and organization management system HNG Backend Stage 2 Project

# User Authentication & Organisation Management API Documentation

## Authentication

All endpoints except registration and login require authentication using JWT tokens. Include the token in the Authorization header as `Bearer <token>`.

## Endpoints

### Register a User

**POST /auth/register**

Registers a new user and creates a default organisation.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
