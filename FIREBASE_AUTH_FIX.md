# Firebase Authentication Fix Guide

## Issue Description

The application is showing the following error:
```
GET https://identitytoolkit.googleapis.com/v1/projects?key=AIzaSyBDqy_Fyc__m45_hEBUhf1U4lfOOepy6mc 400 (Bad Request)
Error signing in: FirebaseError: Firebase: Error (auth/configuration-not-found).
```

This error occurs because Google Authentication is not enabled in the Firebase project.

## Root Cause

The error "auth/configuration-not-found" specifically indicates that Google Authentication is not enabled for the Firebase project. Even though the Firebase configuration is correct, the authentication provider (Google) needs to be explicitly enabled in the Firebase Console.

## Solution Steps

### 1. Enable Google Authentication in Firebase Console

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project ("indianlawsimplified-fcc47")
3. In the left sidebar, click on "Authentication"
4. Click on the "Sign-in method" tab
5. Find "Google" in the list of providers
6. Click on the "Google" provider to edit it
7. Toggle the switch to enable Google sign-in
8. Enter your project's support email
9. Click "Save"

### 2. Verify OAuth Redirect URIs

After enabling Google Authentication, ensure the OAuth redirect URIs are correctly configured:

1. In the Firebase Console, go to "Authentication" > "Sign-in method"
2. Click on the "Google" provider
3. Check that the redirect URIs include:
   - `http://localhost:3000/__/auth/handler`
   - `http://localhost:3006/__/auth/handler` (or whatever port your app is running on)
   - Any production URLs you plan to use

### 3. Test the Authentication

After enabling Google Authentication:

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to the application
3. Click "Sign In with Google" in the navbar
4. You should now be able to sign in successfully

## Code Changes Made

### 1. Updated Firebase Configuration

Changed `frontend/src/config/firebase.js` to use environment variables instead of hardcoded values:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

### 2. Enhanced Error Handling

Updated `frontend/src/contexts/AuthContext.jsx` with better error handling:

- Added specific error messages for common authentication issues
- Added checks for missing configuration
- Improved error reporting to users

### 3. Improved User Feedback

Updated `frontend/src/components/Navbar.jsx` with:

- Loading states for authentication actions
- Better error messages for users
- Disabled buttons during authentication processes

## Environment Variables

The `.env` file in the frontend directory should contain:

```env
VITE_FIREBASE_API_KEY=AIzaSyBDqy_Fyc__m45_hEBUhf1U4lfOOepy6mc
VITE_FIREBASE_AUTH_DOMAIN=indianlawsimplified-fcc47.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=indianlawsimplified-fcc47
VITE_FIREBASE_STORAGE_BUCKET=indianlawsimplified-fcc47.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=643041679067
VITE_FIREBASE_APP_ID=1:643041679067:web:b853af2ffb8cd3aa505efe
VITE_FIREBASE_MEASUREMENT_ID=G-6SZRTC652W
```

## Testing the Fix

After implementing the Firebase Console changes:

1. Clear your browser cache and cookies for the site
2. Restart the development server
3. Try signing in again

If you still encounter issues, check the browser's developer console for any additional error messages.

## Common Issues and Solutions

### 1. Popup Blocked
Error: "auth/popup-blocked"
Solution: Allow popups for the site in your browser settings

### 2. Configuration Not Found
Error: "auth/configuration-not-found"
Solution: Ensure Google Authentication is enabled in Firebase Console

### 3. Network Errors
Error: 400 Bad Request
Solution: Verify all environment variables are correctly set and the Firebase project is properly configured

## Additional Security Considerations

1. Never commit `.env` files to version control
2. Use Firebase security rules to protect your data
3. Implement proper session management
4. Consider adding rate limiting for authentication attempts