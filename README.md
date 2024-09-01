
# Scatch

Scatch is a full-stack web application built with MongoDB, Express, Node.js, and EJS. This project is designed to provide a seamless shopping experience with features like user authentication, product management, a dynamic cart system, and personalized user accounts.

# Demonstration Vedio
[vedio](https://www.linkedin.com/posts/raman-kumar241_webdevelopment-fullstackdevelopment-nodejs-activity-7236064606522089474-yHxh?utm_source=share&utm_medium=member_desktop)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication & Authorization**: Secure login using cookies and bcrypt for password hashing.
- **Cart Management**: Users can add, remove, increment, and decrement items in their cart, with a dedicated cart page.
- **User Account Management**: Users can update their contact details, upload a profile picture, and view their cart items and purchase history.
- **Admin Panel**: Admins can add, delete, and manage products with customizable attributes like name, price, discount, and color settings.
- **Persistent Login**: Users remain logged in with a cookie for a seamless experience until they manually log out.
- **File Uploads**: Uses Multer for uploading and managing product and user images.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ramankumar124/scatch.git
   cd scatch
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:


4. **Start the server**:
   ```bash
   npx nodemon app.js
   ```



## Usage

- **Home Page**: Browse products, register, or log in.
- **User Dashboard**: Manage account details and view purchase history.
- **Cart Page**: Manage cart items (add, remove, adjust quantity).
- **Admin Panel**: Accessible by admins to manage products.

## Folder Structure

```
scatch/
│
├── public/                   # Static files (images, CSS, JavaScript)
├── controllers/          # Route controllers for all app routes
├── middleware/           # Custom middleware
├── models/               # Mongoose models
├── routes/               # Express route handlers
├── utils/                # Utility functions
└── views/                # EJS templates
├── .env                      # Environment variables
├── .gitignore                # Files and directories to ignore in Git
├── package.json              # NPM scripts and dependencies
├── README.md                 # Project documentation
└── app.js                 # Main application file
```

## Environment Variables
- **JWT_SECRET**: Secret key for JWT token generation.

## Technologies Used

- **MongoDB**: NoSQL database for data storage.
- **Express.js**: Web framework for Node.js.
- **Node.js**: JavaScript runtime environment.
- **EJS**: Templating engine for generating HTML markup.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.
- **bcrypt**: Library for hashing passwords.
- **dotenv**: Module for managing environment variables.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.
