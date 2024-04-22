User Authentication API
This project is an API for user authentication, providing functionalities for user registration, login, updating user information, deleting users, and protecting routes based on user roles.

Features
User registration
User login
Update user information
Delete user

Route protection based on user roles
Installation

Clone the repository:
bash
Copy code

Install dependencies:
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory.
Add the following environment variables:
makefile
Copy code
SECRET_KEY=<your-secret-key>
EXPIRES_IN=<token-expiration-time>

Start the server:
Copy code
npm start
Usage

User Registration
Endpoint:
Copy code
POST /register
Request Body:

json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
User Login
Endpoint:

Copy code
POST /
Request Body:

json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Update User Information
Endpoint:

bash
Copy code
PUT /updateUser/:id
Request Body:

json
Copy code
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "0987654321"
}
Delete User
Endpoint:

bash
Copy code
DELETE /:id
Route Protection
To protect routes based on user roles, use the protect middleware along with the restrictTo middleware.

Example:

javascript
Copy code
router.put('/updateUser/:id', authController.protect, authController.restrictTo('user'), userController.updateUser);
Contributing
Contributions are welcome! Please follow the guidelines in CONTRIBUTING.md.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Credits
bcrypt
jsonwebtoken
express
mongoose
validator
