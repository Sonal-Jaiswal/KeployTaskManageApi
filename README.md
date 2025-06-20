# Task Manager API Project

## Overview

A simple full-stack app with:
- **Backend:** Node.js + Express + MongoDB
- **Frontend:** React
- **Features:** CRUD for tasks

---

## API Documentation

### 1. Get all tasks
- **Endpoint:** `GET /api/tasks`
- **Response:**
```
[
  { "id": 1, "title": "Sample", "description": "Test", "completed": 0 }
]
```

### 2. Create a task
- **Endpoint:** `POST /api/tasks`
- **Body:**
```
{ "title": "New Task", "description": "Details" }
```
- **Response:**
```
{ "id": 2, "title": "New Task", "description": "Details", "completed": 0 }
```

### 3. Update a task
- **Endpoint:** `PUT /api/tasks/:id`
- **Body:**
```
{ "title": "Updated", "description": "Updated", "completed": 1 }
```
- **Response:**
```
{ "updated": 1 }
```

### 4. Delete a task
- **Endpoint:** `DELETE /api/tasks/:id`
- **Response:**
```
{ "deleted": 1 }
```

---

## Sample curl Commands

```sh
# Get all tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST -H "Content-Type: application/json" -d '{"title":"Test","description":"Try"}' http://localhost:5000/api/tasks

# Update a task
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Done","description":"Finished","completed":1}' http://localhost:5000/api/tasks/1

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/1
```

---

## How to Run

### Backend

```sh
cd backend
npm install mongoose dotenv
npm start
```

### Frontend

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database

- Uses MongoDB
- No setup needed; tables auto-created.

---

## How to Interact

- Use the frontend UI for CRUD.
- Use curl or Postman for API testing.

---

## How to Test the API

You can test your API in several ways:

### 1. Using curl (from the terminal)
- See the [API Test Cases (with curl)](#api-test-cases-with-curl) section below for ready-to-use commands for all endpoints (GET, POST, PUT, DELETE).
- Example:
  ```sh
  curl http://localhost:5001/api/tasks
  ```

### 2. Using Postman or Insomnia
- Import your endpoints and test GET, POST, PUT, DELETE requests visually.
- Set the request body as JSON for POST/PUT.
- Inspect responses and errors easily.

### 3. Using the React Frontend
- Start the frontend (`npm start` in the `frontend` folder).
- Use the web UI to create, read, update, and delete tasks.
- All actions interact with your API in real time.

### 4. Using a Browser
- Open [http://localhost:5001/api/tasks](http://localhost:5001/api/tasks) to view all tasks (GET only).

---

## API Test Cases (with curl)

### 1. Get all tasks
**Request:**
```sh
curl http://localhost:5001/api/tasks
```
**Expected Response:**
```json
[
  { "id": 1, "title": "Sample", "description": "Test", "completed": 0 }
]
```

### 2. Create a new task
**Request:**
```sh
curl -X POST -H "Content-Type: application/json" -d '{"title":"Test Task","description":"Try this"}' http://localhost:5001/api/tasks
```
**Expected Response:**
```json
{ "id": 2, "title": "Test Task", "description": "Try this", "completed": 0 }
```

### 3. Update a task (mark as completed)
**Request:**
```sh
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Test Task","description":"Try this","completed":1}' http://localhost:5001/api/tasks/2
```
**Expected Response:**
```json
{ "updated": 1 }
```

### 4. Delete a task
**Request:**
```sh
curl -X DELETE http://localhost:5001/api/tasks/2
```
**Expected Response:**
```json
{ "deleted": 1 }
```

### 5. Error case: Get a non-existent task (should return empty or error)
**Request:**
```sh
curl http://localhost:5001/api/tasks/9999
```
**Expected Response:**
```json
{}
```

---

You can copy-paste these commands into your terminal to test your API endpoints. Modify the IDs as needed for your data.

---

## License

MIT 