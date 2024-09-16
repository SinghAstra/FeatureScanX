## 🚀 Contributing to [Social](https://social-one-liart.vercel.app)

Thank you for considering contributing to Social! I appreciate your interest and efforts. This document provides guidelines on how you can contribute to this project.

## 🚀 How to Contribute

### 🚀 Reporting Bugs

If you find a bug, please follow these steps:

1. **Check the issue tracker**: Make sure the bug hasn't already been reported.
2. **Open a new issue**: Provide a clear and concise description of the bug. Include steps to reproduce it, expected behavior, and screenshots if possible.

### 🚀 Requesting Features

If you have an idea for a new feature, please:

1. **Check the issue tracker**: Ensure the feature request isn't already listed.
2. **Open a new issue**: Describe the feature in detail. Explain why it's useful and how it can be implemented.

### 🚀 Submitting Code

To submit code contributions, follow these steps:

1. **Fork the repository**: Create a personal copy of the repository on GitHub.
2. **Clone your fork**: Download your fork to your local machine.

   ```bash
   git clone https://github.com/SinghAstra/Social.git
   ```

3. **Create a new branch**: Use a descriptive name for the branch.

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**: Implement your feature or fix the bug.
5. **Test your changes**: Ensure that your changes work as expected and do not break existing functionality.
6. **Commit your changes**: Write a clear commit message describing your changes.

   ```bash
   git add .
   git commit -m "Add a concise description of your changes"
   ```

7. **Push your changes**: Upload your changes to your fork.

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a pull request**: Go to the original repository and open a pull request. Provide a detailed description of your changes.

## 🚀 Setting up the Project Locally

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SinghAstra/Social.git
   cd Social
   ```

2. **Install dependencies**:

   ```bash
   <!-- For the backend -->
   cd server
   npm install

   <!-- For the Frontend -->
   cd ../client
   npm install
   ```

3. **Set up environment variables**: Create .env files in both the server and client directories with the required environment variables. You can refer to the .env.example files for the required variables.

   In client/.env.development

   ```bash
   VITE_GOOGLE_CLIENT_ID=dev-google-client-id
   VITE_GOOGLE_CLIENT_SECRET=dev-google-client-secret
   VITE_GITHUB_CLIENT_ID=dev-github-client-id
   VITE_GITHUB_CLIENT_SECRET=dev-github-client-secret
   VITE_API_URL=http://localhost:3000/api
   VITE_SOCKET_ENDPOINT=http://localhost:3000/socket
   ```

   In src/.env.development

   ```bash
   MONGODB_URI=mongodb://localhost:27017/dev-db
   ACCESS_TOKEN_SECRET=dev-access-token-secret
   JWT_SECRET=dev-jwt-secret
   REFRESH_TOKEN_SECRET=dev-refresh-token-secret
   CLOUDINARY_CLOUD_NAME=dev-cloud-name
   CLOUDINARY_API_KEY=dev-cloud-api-key
   CLOUDINARY_API_SECRET=dev-cloud-api-secret
   EMAIL=dev-email@example.com
   APP_PASSWORD=dev-app-password
   CRYPT_PASSWORD=dev-crypt-password
   IV=dev-initialization-vector
   REMOTE=dev-remote-server
   GOOGLE_CLIENT_ID=dev-google-client-id
   GOOGLE_CLIENT_SECRET=dev-google-client-secret
   GITHUB_CLIENT_ID=dev-github-client-id
   GITHUB_CLIENT_SECRET=dev-github-client-secret
   GITHUB_REDIRECT_URI=http://localhost:3000/auth/github/callback
   PORT=5000
   ```
