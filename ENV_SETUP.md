# Environment Variables Setup

## Frontend Environment Variables

Create a file `frontend/.env` with the following:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Razorpay
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Backend Environment Variables

Create a file `backend/.env` with the following:

```env
# Server
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/lexease
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lexease

# AI Service
# Choose one: OpenAI or Gemini
OPENAI_API_KEY=your_openai_api_key
# OR
GEMINI_API_KEY=your_gemini_api_key
USE_GEMINI=false

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email (for lawyer leads and contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
LAWYER_EMAIL=lawyer@example.com
CONTACT_EMAIL=contact@example.com
```

## Getting API Keys

### Firebase
1. Go to https://console.firebase.google.com
2. Create a new project or select existing
3. Enable Google Authentication
4. Go to Project Settings > General
5. Copy the Firebase config values

### OpenAI
1. Go to https://platform.openai.com
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key

### Google Gemini
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key

### Razorpay
1. Go to https://razorpay.com
2. Sign up and log in
3. Go to Settings > API Keys
4. Generate test/live keys

### MongoDB
- Local: Install MongoDB locally or use Docker
- Atlas: Go to https://www.mongodb.com/cloud/atlas and create a free cluster

### Email (Gmail)
1. Enable 2-factor authentication
2. Go to Google Account > Security > App Passwords
3. Generate an app password for "Mail"
4. Use this password in SMTP_PASS

