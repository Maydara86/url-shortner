# URL Shortener API Documentation

This document describes the APIs for shortening URLs, redirecting to original URLs, and listing shortened URLs.

---

## **1. Shorten a URL**

Creates a shortened URL for a given original URL.

### **Endpoint**

```
POST /api/shorten
```

### **Request**

**Body**:

```json
{
  "url": "https://example.com/long-url"
}
```

### **Response**

**Success (200 OK)**:

```json
{
  "shortUrl": "http://localhost:3000/api/shortened/abc123"
}
```

**Errors**:

- `400 Bad Request`: Invalid URL format.
- `409 Conflict`: URL already exists.
- `500 Internal Server Error`: Server error.

---

## **2. Redirect to Original URL**

Redirects to the original URL using the shortened ID.

### **Endpoint**

```
GET /api/shortened/{shortId}
```

### **Request**

**Path Parameter**:

- `shortId`: The shortened URL identifier (e.g., `abc123`).

### **Response**

- `307 Found`: Redirects to the original URL.
- `404 Not Found`: Short ID does not exist.
- `500 Internal Server Error`: Server error.

---

## **3. List Shortened URLs**

Retrieves a paginated list of all shortened URLs.

### **Endpoint**

```
GET /api/shortened/list?page={page}
```

### **Query Parameters**

- `page` (optional): Page number (default: `1`).

### **Response**

**Success (200 OK)**:

```json
{
  "urls": [
    {
      "originalUrl": "https://example1.com/long-url",
      "shortId": "abc123"
    },
    {
      "originalUrl": "https://example2.com/long-url",
      "shortId": "abc123"
    },
    {
      "originalUrl": "https://example3.com/long-url",
      "shortId": "abc123"
    },
    {
      "originalUrl": "https://example4.com/long-url",
      "shortId": "abc123"
    },
    {
      "originalUrl": "https://example5.com/long-url",
      "shortId": "abc123"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 15,
    "perPage": 5
  }
}
```

**Errors**:

- `400 Bad Request`: Invalid page number.
- `500 Internal Server Error`: Server error.
