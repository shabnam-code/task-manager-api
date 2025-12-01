# Summary

1. This is Full Stack project with React, Node.js, and MongoDB
   1. **Frontend**: [task-manager-ui](https://github.com/shabnam-code/task-manager-ui) created using React, Routes, Redux Thunk, Material UI.
   2. **Backend**: created using node, express and mongodb
2. **Functionality**
   1. **Normal User**: Can create and edit tasks.
   2. **Admin User**: Can create, edit, as well as delete tasks.
3. **Demo Video**: [Link](https://drive.google.com/file/d/1l2XnvV6-K0N-ERxIJ0SspsYy6thK6F4D/view?usp=drive_link)

---

## API Contract

### User APIs

- **POST /signup**: User registration.
- **POST /signin**: User login.

### Task APIs

- **POST /**: Create a task.
- **GET /**: Retrieve tasks.
- **PUT /:id**: Update a task.
- **DELETE /:id**: Delete a task.
