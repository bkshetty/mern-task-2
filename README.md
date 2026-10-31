# MERN Stack - Sign Up Feature (Task 2)

A full-stack user registration and authentication system built using the **MERN** stack (MongoDB Atlas, Express.js, React, Node.js) with password hashing via `bcryptjs`.

---

## Output

### 1. Sign Up Page
Initial clean sign-up interface matching the modern rounded-card design.
![Sign Up Page](./screenshots/1_signup_page.png)

---

### 2. Inputting User Credentials for Sign Up
User entering their email and password into the registration form.
![Inputting User Credentials](./screenshots/2_input_credentials.png)

---

### 3. MongoDB Atlas Collection Before Sign Up
MongoDB Atlas database (`mern_signup_db -> users`) showing that the collection is currently empty before registration.
![MongoDB Before Sign Up](./screenshots/3_mongodb_before.png)

---

### 4. Output After Pressing Sign Up Button
The React UI displaying the green success notification banner (**"Account created successfully!"**) after the REST API processes the registration.
![Sign Up Success](./screenshots/4_signup_success.png)

---

### 5. MongoDB Atlas After Sign Up (Data Stored)
MongoDB Atlas Data Explorer showing the newly created user document stored in the cloud with timestamps and encrypted password hash (`bcrypt`).
![MongoDB After Sign Up](./screenshots/5_mongodb_data_stored.png)

---

## How to Run Locally

### 1. Setup Backend
```bash
cd backend
npm install
# Configure your MongoDB URI in backend/.env
npm run dev
```
Server starts on `http://localhost:5001`.

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Client starts on `http://localhost:5173`.
