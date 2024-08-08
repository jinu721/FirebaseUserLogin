## User Auth Web App

## Live Demo
[User Management App](https://yourdemo.link)

### Overview

This web app helps users manage their accounts easily. It uses Firebase for user authentication and a Realtime Database to store and show user information. Users can create accounts, log in, recover forgotten passwords, and update their profile details whenever they need.

### Features

- **Create Account:** Users can sign up with their email and password.
- **Login:** Users can securely log in to view and manage their information.
- **Forgot Password:** Simple steps to reset a forgotten password.
- **Show User Data:** Displays user information from the Firebase Realtime Database.
- **Update Data:** Users can update their profile information, which is instantly saved in the database.

### Important Information

This app is best used on a laptop or desktop computer. The design is straightforward, making it easy to navigate, but it may not look perfect on mobile devices.

---

### Technologies Used

- **HTML:** Structures the web pages.
- **CSS:** Styles the pages to look clean and simple.
- **JavaScript:** Adds interactive features and connects the app to Firebase.
- **Firebase:** Handles user login, database storage, and real-time updates.

### How to Use

1. **Clone the Project:**
   - Download the project from GitHub.
   - Open the `index.html` file in your web browser.

2. **Set Up Firebase:**
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Install Firebase in your project:
   - Get Firebase details from Firebase.
   - Initialize Firebase in your JavaScript file:
     ```javascript
     const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-auth-domain",
       projectId: "your-project-id",
       storageBucket: "your-storage-bucket",
       messagingSenderId: "your-messaging-sender-id",
       appId: "your-app-id",
       databaseURL: "your-database-url"
     };
     const app = initializeApp(firebaseConfig);
     ```

3. **Set Up Firebase Realtime Database:**
   - In the Firebase Console, go to Realtime Database and click "Create Database."
   - Choose your preferred location and click "Enable."
   - Set up your database rules:
     ```json
     {
       "rules": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
     ```
   - This ensures that only authenticated users can read and write data.

4. **Set Up Firebase Storage Rules:**
   - In the Firebase Console, go to Storage and click "Get Started."
   - Set up your storage rules:
     ```json
     service firebase.storage {
       match /b/{bucket}/o {
         match /{allPaths=**} {
           allow read, write: if request.auth != null;
         }
       }
     }
     ```
   - This restricts file uploads and downloads to authenticated users only.

5. **Run the Project:**
   - Open the `index.html` file in your browser to see the home page.
   - Use the sign-up form to create a new account or log in if you already have one.

### Author

This project was created by jinu. If you have any questions or feedback, you can reach me at jinu8683@gmail.com.

---

This project is open-source and available on GitHub under the username jinu721. Feel free to use the code, but please respect the licensing terms.

---
