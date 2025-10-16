# 📚 Book Selling API - Complete Endpoints Guide

## 🌐 Base URL
```
http://localhost:4000
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/api/v1/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

**Response (201):**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer",
  "token": "jwt_token_here"
}
```

---

### 2. Login
**POST** `/api/v1/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "admin@readable.test",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "id": "user_id",
  "name": "Admin",
  "email": "admin@readable.test",
  "role": "admin",
  "token": "jwt_token_here"
}
```

---

## 📖 Book Endpoints

### 3. Create Book (Admin Only - Protected)
**POST** `/api/v1/books/create-book`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

**Body:**
```json
{
  "title": "The Great Book",
  "author": "John Author",
  "price": 29.99,
  "category": "Fiction",
  "stock": 100
}
```

**Response (201):**
```json
{
  "message": "Book created",
  "book": {
    "id": 1,
    "title": "The Great Book",
    "author": "John Author",
    "price": 29.99,
    "category": "Fiction",
    "stock": 100
  }
}
```

**Error (401 - No Token):**
```json
{
  "message": "Not authorized, no token"
}
```

**Error (403 - Not Admin):**
```json
{
  "message": "Forbidden: insufficient role"
}
```

---

### 4. Get All Books (Public)
**GET** `/api/v1/books`

**Headers:**
```
Content-Type: application/json
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "book_id",
      "title": "Book Title",
      "author": "Author Name",
      "price": 29.99,
      "category": "Fiction",
      "stock": 100
    }
  ]
}
```

---

### 5. Get All Books (Protected - Requires Auth)
**GET** `/api/v1/books/protected`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "books": [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Author Name",
      "price": 29.99,
      "category": "Fiction",
      "stock": 100
    }
  ]
}
```

---

### 6. Get Book by ID
**GET** `/api/v1/books/:id`

**Example:** `/api/v1/books/123`

**Headers:**
```
Content-Type: application/json
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "title": "Book Title",
    "author": "Author Name",
    "price": 29.99,
    "category": "Fiction",
    "stock": 100
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 7. Update Book
**PUT** `/api/v1/books/:id`

**Example:** `/api/v1/books/123`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Updated Title",
  "price": 39.99,
  "stock": 50
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "title": "Updated Title",
    "author": "Author Name",
    "price": 39.99,
    "category": "Fiction",
    "stock": 50
  }
}
```

---

### 8. Delete Book
**DELETE** `/api/v1/books/:id`

**Example:** `/api/v1/books/123`

**Headers:**
```
Content-Type: application/json
```

**Response (200):**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

---

## 🔑 Using Authentication Token

After logging in, you'll receive a JWT token. Use it in subsequent requests:

1. Copy the token from login response
2. In Postman, go to the "Authorization" tab
3. Select "Bearer Token" from the Type dropdown
4. Paste your token in the Token field

OR manually add to Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Quick Test Sequence

### 1. Login as Admin
```
POST /api/v1/auth/login
Body: {"email": "admin@readable.test", "password": "admin123"}
```
→ Copy the token from response

### 2. Create a Book (Use token)
```
POST /api/v1/books/create-book
Headers: Authorization: Bearer YOUR_TOKEN
Body: {"title": "Test Book", "author": "Test Author", "price": 19.99, "category": "Test", "stock": 10}
```

### 3. Get All Books (Public)
```
GET /api/v1/books
```

### 4. Get All Books (Protected - Use token)
```
GET /api/v1/books/protected
Headers: Authorization: Bearer YOUR_TOKEN
```

---

## 🎯 Pre-seeded Admin Account

- **Email:** `admin@readable.test`
- **Password:** `admin123`
- **Role:** `admin`

---

## ⚠️ Common Errors

### 401 Unauthorized
- Missing or invalid token
- Token expired
- Wrong credentials

### 403 Forbidden
- User doesn't have required role
- Admin-only endpoint accessed by customer

### 404 Not Found
- Wrong endpoint URL
- Resource doesn't exist

### 400 Bad Request
- Missing required fields
- Invalid data format