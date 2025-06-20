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

## Deployed URLs

- **Backend API:** [https://keploytaskmanageapi.onrender.com/api/tasks](https://keploytaskmanageapi.onrender.com/api/tasks)
- **Frontend:** [https://keploy-task-manage-api.vercel.app](https://keploy-task-manage-api.vercel.app)

---

## How to Test the Deployed API

You can test the deployed API using these curl commands:

### 1. Get all tasks
```sh
curl https://keploytaskmanageapi.onrender.com/api/tasks
```

### 2. Create a new task
```sh
curl -X POST -H "Content-Type: application/json" -d '{"title":"Test Task","description":"Try this"}' https://keploytaskmanageapi.onrender.com/api/tasks
```

### 3. Update a task (replace <id> with the actual _id from GET)
```sh
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated","description":"Updated desc","completed":true}' https://keploytaskmanageapi.onrender.com/api/tasks/<id>
```

### 4. Delete a task (replace <id> with the actual _id from GET)
```sh
curl -X DELETE https://keploytaskmanageapi.onrender.com/api/tasks/<id>
```

---

You can also interact with the API using the deployed frontend:
[https://keploy-task-manage-api.vercel.app](https://keploy-task-manage-api.vercel.app)

---

## License

MIT 