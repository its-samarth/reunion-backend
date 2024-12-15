
# To-Do Task App - Backend  

The **To-Do Task App Backend** provides the API and server-side functionality for managing tasks. This backend handles user authentication, task operations (CRUD), and serves dashboard analytics. Built using Node.js, Express.js, and MongoDB, it offers a robust and secure architecture for the application.  

---

## Features  
- **User Authentication**: Secure login and registration using JWT.  
- **Task Management**: Perform CRUD operations on tasks.  
- **Dashboard Analytics**: Retrieve task-based insights via the dashboard.  
- **RESTful API**: Clean and structured API endpoints for integration.  

---

## Deployment Links  
- **Backend Deployment**: [https://reunion-backend-ibh5.onrender.com/](https://reunion-backend-ibh5.onrender.com/)  
- **Frontend Deployment**: [https://reunion-frontend-peach.vercel.app/](https://reunion-frontend-peach.vercel.app/)  

---

## API Documentation  

### Base URL  
```
https://reunion-backend-ibh5.onrender.com/api
```

### Authentication  

#### Login  
- **Endpoint**: `POST /auth/login`  
- **Description**: Authenticates a user and returns a JWT token.  
- **Request Body**:  
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```  
- **Response**:  
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```  

#### Register  
- **Endpoint**: `POST /auth/register`  
- **Description**: Registers a new user and returns a JWT token.  
- **Request Body**:  
  ```json
  {
    "email": "newuser@example.com",
    "password": "password123"
  }
  ```  
- **Response**:  
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```  

---

### Task Management  

#### Get All Tasks  
- **Endpoint**: `GET /tasks`  
- **Description**: Retrieves all tasks for the authenticated user.  
- **Headers**:  
  ```json
  {
    "Authorization": "Bearer JWT_TOKEN"
  }
  ```  
- **Response**:  
  ```json
  [
    {
      "id": "task1",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
  ]
  ```  

#### Create a Task  
- **Endpoint**: `POST /tasks`  
- **Description**: Creates a new task.  
- **Headers**:  
  ```json
  {
    "Authorization": "Bearer JWT_TOKEN"
  }
  ```  
- **Request Body**:  
  ```json
  {
    "title": "New Task",
    "description": "Task Description"
  }
  ```  
- **Response**:  
  ```json
  {
    "id": "newTaskId",
    "title": "New Task",
    "description": "Task Description",
    "status": "pending"
  }
  ```  

#### Update a Task  
- **Endpoint**: `PUT /tasks/:taskId`  
- **Description**: Updates an existing task.  
- **Headers**:  
  ```json
  {
    "Authorization": "Bearer JWT_TOKEN"
  }
  ```  
- **Request Body**:  
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "completed"
  }
  ```  
- **Response**:  
  ```json
  {
    "id": "taskId",
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "completed"
  }
  ```  

#### Delete a Task  
- **Endpoint**: `DELETE /tasks/:taskId`  
- **Description**: Deletes a task.  
- **Headers**:  
  ```json
  {
    "Authorization": "Bearer JWT_TOKEN"
  }
  ```  
- **Response**:  
  ```json
  {
    "message": "Task deleted successfully."
  }
  ```  

---

### Dashboard  

#### Get Dashboard Data  
- **Endpoint**: `POST /dashboard`  
- **Description**: Fetches analytics based on user tasks.  
- **Headers**:  
  ```json
  {
    "Authorization": "Bearer JWT_TOKEN"
  }
  ```  
- **Request Body**:  
  ```json
  {
    "tasks": [
      {
        "status": "completed",
        "category": "work"
      }
    ]
  }
  ```  
- **Response**:  
  ```json
  {
    "totalTasks": 10,
    "completedTasks": 7,
    "pendingTasks": 3
  }
  ```  

---

## Installation  

### Prerequisites  
Ensure you have the following installed:  
- Node.js  
- npm  

---

### Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/its-samarth/reunion-backend.git  
   ```  
2. Navigate to the project directory:  
   ```bash  
   cd reunion-backend  
   ```  
3. Install dependencies:  
   ```bash  
   npm install  
   ```  

---

### Scripts  
- **Clean**: Remove the `dist` directory.  
  ```bash  
  npm run clean  
  ```  
- **Build**: Compile the TypeScript files.  
  ```bash  
  npm run build  
  ```  
- **Start**: Run the server using the compiled files.  
  ```bash  
  npm start  
  ```  
- **Dev**: Start the server in development mode with `nodemon`.  
  ```bash  
  npm run dev  
  ```  

---

## Tech Stack  
- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)  

---

## Future Enhancements  
- Add testing with tools like Jest.  
- Introduce rate limiting for APIs to prevent abuse.  
- Enhance error handling and logging.  

---

## License  
This project is licensed under the **MIT License**.  

---

## Contact  
For any queries or suggestions, feel free to reach out:  
- **Name**: Samarth Soni  
- **Phone**: 7046755055  
```  

This README template includes clear sections for API documentation, making it easier for developers to integrate with the backend. 
