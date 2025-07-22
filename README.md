# Course Management API

A RESTful API built with Node.js, Express, and MongoDB for managing courses and users with authentication and role-based access control.

## Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT token-based authentication
- Role-based access control
- Password hashing with bcrypt
- File upload support for user avatars

### 👥 User Management
- User registration with profile information
- User authentication
- Paginated user listing
- Avatar upload functionality

### 📚 Course Management
- Create, read, update, and delete courses
- Paginated course listing
- Input validation
- Course search and filtering

### 🛡️ Security & Middleware
- Global error handling middleware
- JWT token verification middleware
- Role-based authorization with `allowedTo` middleware
- Input validation with express-validator and custom validation schemas
- Async error wrapper for better error management
- CORS enabled for cross-origin requests

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator with custom schemas
- **File Upload**: Multer (for avatar functionality)
- **Environment**: dotenv for configuration
- **Authorization**: Role-based access control system


## Project Structure

```
├── controllers/
│   ├── courses.controller.js   # Course controller logic
│   └── users.controller.js     # User controller logic
├── data/
│   └── courses.js             # Course data/seeds
├── middleware/
│   ├── allowedTo.js           # Role-based authorization middleware
│   ├── asyncWrapper.js        # Async error handling wrapper
│   ├── validationSchema.js    # Input validation schemas
│   └── verifyToken.js         # JWT token verification middleware
├── models/
│   ├── course.model.js        # Course schema
│   └── user.model.js          # User schema
├── node_modules/              # Dependencies
├── routes/
│   ├── courses.route.js       # Course routes
│   └── users.route.js         # User routes
├── uploads/                   # File upload directory
├── utils/
│   ├── appError.js           # Custom error class
│   ├── generateJWT.js        # JWT token generation
│   ├── httpStatusText.js     # Status text constants
│   └── userRoles.js          # User role definitions
├── .env                      # Environment variables
├── index.js                  # Main application file
├── package.json              # Project dependencies and scripts
└── package-lock.json         # Dependency lock file
```



## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd course-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URL=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-jwt-secret-key
   PORT=5001
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

The server will start on `http://localhost:5001`

## Middleware

The API includes several middleware components:

- **asyncWrapper.js**: Wraps async functions to handle errors automatically
- **verifyToken.js**: Validates JWT tokens for protected routes
- **allowedTo.js**: Implements role-based access control
- **validationSchema.js**: Contains validation schemas for different endpoints

## API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
```
**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "role": "user"
}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "users": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "avatar": "filename.jpg",
      "token": "jwt_token"
    }
  }
}
```

#### Login User
```http
POST /api/users/login
```
**Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "token": "jwt_token"
  }
}
```

### User Endpoints

#### Get All Users
```http
GET /api/users?page=1&limit=10
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "data": {
    "users": [
      {
        "id": "user_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "role": "user"
      }
    ]
  }
}
```

### Course Endpoints

#### Get All Courses
```http
GET /api/courses?page=1&limit=10
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "data": {
    "courses": [
      {
        "id": "course_id",
        "title": "Course Title",
        "description": "Course Description",
        "price": 99.99
      }
    ]
  }
}
```

#### Get Single Course
```http
GET /api/courses/:courseId
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "course": {
      "id": "course_id",
      "title": "Course Title",
      "description": "Course Description",
      "price": 99.99
    }
  }
}
```

#### Create Course
```http
POST /api/courses
```
**Body:**
```json
{
  "title": "New Course",
  "description": "Course description",
  "price": 99.99
}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "courses": {
      "id": "course_id",
      "title": "New Course",
      "description": "Course description",
      "price": 99.99
    }
  }
}
```

#### Update Course
```http
PUT /api/courses/:courseId
```
**Body:** (partial update supported)
```json
{
  "title": "Updated Course Title",
  "price": 149.99
}
```

#### Delete Course
```http
DELETE /api/courses/:courseId
```
**Response:**
```json
{
  "status": "success",
  "data": null
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "status": "fail" | "error",
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `404` - Not Found
- `500` - Internal Server Error

## File Upload

The API supports file uploads for user avatars. Uploaded files are served from the `/uploads` directory.

**Access uploaded files:**
```
GET http://localhost:5001/uploads/filename.jpg
```


