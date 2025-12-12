# recipe-sharing-backend

🍽️ Recipe Sharing Backend (Node.js + Express + MongoDB)

A fully functional backend API for a Recipe Sharing Application built using:

Node.js

Express.js

MongoDB + Mongoose
<img width="1919" height="1032" alt="Screenshot 2025-12-12 145210" src="https://github.com/user-attachments/assets/d66e0532-6635-41c4-9842-0121833bb998" />
<img width="1919" height="1028" alt="Screenshot 2025-12-12 145358" src="https://github.com/user-attachments/assets/8b42cae1-93a5-43b3-8d45-00d98a998502" />
<img width="1919" height="1032" alt="Screenshot 2025-12-12 145344" src="https://github.com/user-attachments/assets/4ba05672-54dd-4865-b599-1fe480cb673f" />
<img width="1919" height="1031" alt="Screenshot 2025-12-12 145304" src="https://github.com/user-attachments/assets/31e1ba4d-8cd4-4ef7-8e30-1bf10a656295" />
<img width="1919" height="1029" alt="Screenshot 2025-12-12 145250" src="https://github.com/user-attachments/assets/204e9bf1-2745-435c-9856-671758139b2d" />

JWT Authentication

Bcrypt Password Hashing

MVC Architecture

Role-Based Access Control (User / Admin)

------------------------------------------------------------------------------------------------

📌 Features
👤 User Features

User Registration

User Login (JWT-based)

View own profile

Update profile

Delete account

Only user can see their own recipes

------------------------------------------------------------------------------------------------

🍳 Recipe Features

User can create recipes

User can read their own recipes

User can update their own recipes

User can delete their own recipes

Only recipe owner can modify/delete their recipe

Admin can see all recipes

------------------------------------------------------------------------------------------------

🔐 Authentication & Authorization

Passwords hashed using bcrypt

Token-based authentication using JWT

Middleware protection for private routes

Role-based access control (admin / user)

------------------------------------------------------------------------------------------------

📁 Project Structure
backend-recipe-sharing/
│
├── app.js
├── package.json
├── .env
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   └── recipeController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── userModel.js
│   └── recipeModel.js
│
├── routes/
│   ├── userRoutes.js
│   └── recipeRoutes.js
│
└── README.md


------------------------------------------------------------------------------------------------

⚙️ Installation & Setup
1. Clone repository
    git clone <repository-url>
    cd backend-recipe-sharing

2. Install dependencies
   npm install

3. Run server
npm start


Server will run at:

http://localhost:5000

------------------------------------------------------------------------------------------------

📌 API Endpoints
👤 User Routes

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/api/users/me` | Get own profile    |
| PUT    | `/api/users/me` | Update own profile |
| DELETE | `/api/users/me` | Delete own account |

------------------------------------------------------------------------------------------------

🍳 User Recipe Routes

| Method | Endpoint                  | Description       |
| ------ | ------------------------- | ----------------- |
| POST   | `/api/recipes`            | Create recipe     |
| GET    | `/api/recipes/my-recipes` | Get own recipes   |
| GET    | `/api/recipes/:id`        | Get single recipe |
| PUT    | `/api/recipes/:id`        | Update recipe     |
| DELETE | `/api/recipes/:id`        | Delete recipe     |

------------------------------------------------------------------------------------------------

🛡️ Admin Recipe Routes

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| GET    | `/api/recipes` | Admin get all recipes |


------------------------------------------------------------------------------------------------

🔒 Middleware Explanation
authMiddleware

Verifies JWT token

Attaches user data to req.user

roleMiddleware

Allows only Admin to access specific routes

Example:

router.get("/all", roleMiddleware("admin"), getAllRecipes);

------------------------------------------------------------------------------------------------

🛠️ Technologies Used

| Technology | Purpose            |
| ---------- | ------------------ |
| Node.js    | Backend runtime    |
| Express.js | Web framework      |
| MongoDB    | Database           |
| Mongoose   | ODM                |
| JWT        | Authentication     |
| Bcrypt     | Password hashing   |
| Dotenv     | Environment config |

------------------------------------------------------------------------------------------------
📤 Example Request Bodies

👤 User Registration Example

{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}


🍳 Create Recipe Example

{
  "title": "Pasta",
  "ingredients": "Tomato, Salt, Pasta",
  "instructions": "Boil pasta and mix ingredients"
}


------------------------------------------------------------------------------------------------

📤 Response Example
Successful Login
{
  "message": "Login successful",
  "token": "your_jwt_token"
}

------------------------------------------------------------------------------------------------

📚 Useful Commands
Command	Description
npm start	Start server
npm run dev	Start in development (nodemon)

------------------------------------------------------------------------------------------------

🤝 Contribution
Feel free to open issues or submit pull requests to improve the project.

------------------------------------------------------------------------------------------------

📜 License
This project is licensed under the MIT License.




