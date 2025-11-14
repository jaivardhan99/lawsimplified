# LexEase - AI-Powered Legal Documentation Platform

LexEase is a full-stack web application that helps users in India create legal documents quickly and efficiently using AI-powered technology.

## 🚀 Features

- **AI-Powered Chatbot**: Interactive legal advisor that helps users understand their needs and guides them through document creation
- **Document Library**: Browse and search through a collection of legal document templates
- **Document Generation**: AI-powered document generation with user inputs
- **Payment Integration**: Razorpay integration for document downloads and subscriptions
- **Lawyer Connect**: Connect with qualified lawyers for personalized legal advice
- **Legal Insights**: Blog with articles on legal topics
- **User Authentication**: Firebase Authentication with Google Sign-in

## 🧱 Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router
- Firebase Authentication
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- OpenAI / Google Gemini API
- Razorpay
- Nodemailer

## 📁 Project Structure

```
law-proj/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components (Navbar, Footer)
│   │   ├── pages/          # Page components (Home, Docs, Advisor, etc.)
│   │   ├── contexts/       # React contexts (AuthContext)
│   │   ├── config/         # Configuration files (Firebase)
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic (AI, email, etc.)
│   ├── server.js           # Express server
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Firebase project
- OpenAI API key OR Google Gemini API key
- Razorpay account
- Email account for SMTP

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd law-proj
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   **Frontend** (`frontend/.env`):
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

   **Backend** (`backend/.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lexease
   OPENAI_API_KEY=your_openai_api_key
   # OR
   GEMINI_API_KEY=your_gemini_api_key
   USE_GEMINI=false
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   LAWYER_EMAIL=lawyer@example.com
   CONTACT_EMAIL=contact@example.com
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `backend/.env`

5. **Set up Firebase**
   - Create a Firebase project
   - Enable Google Authentication
   - Copy Firebase config to `frontend/.env`

6. **Seed the database** (optional)
   ```bash
   cd backend
   node seed.js
   ```

### Running the Application

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Or run separately:**

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📡 API Endpoints

### Chat
- `POST /api/chat` - Chat with AI advisor

### Documents
- `GET /api/docs` - Get all document templates
- `POST /api/generateDoc` - Generate a document

### Payment
- `POST /api/payment` - Create payment order
- `POST /api/payment/verify` - Verify payment

### Lawyer Leads
- `POST /api/lawyerLead` - Submit lawyer consultation request

### Contact
- `POST /api/contact` - Submit contact form

## 🗄️ Database Collections

- **users**: User accounts and subscriptions
- **templates**: Document templates
- **transactions**: Payment transactions
- **lawyerLeads**: Lawyer consultation requests
- **articles**: Legal insights blog posts

## 💰 Pricing Plans

1. **Free**: View templates, basic chatbot
2. **Standard**: ₹299 per document (AI generation + download)
3. **Pro**: ₹499/month (unlimited documents + lawyer consultation)

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Backend (Render/Railway)

1. Connect your repository
2. Set environment variables
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`

## 📝 Notes

- The AI service supports both OpenAI and Google Gemini. Set `USE_GEMINI=true` to use Gemini.
- For production, ensure proper error handling and logging
- Add rate limiting for API endpoints
- Implement proper file upload handling for lawyer leads
- Add PDF/Word export functionality for generated documents

## 🔒 Security Considerations

- Never commit `.env` files
- Use environment variables for all sensitive data
- Implement proper authentication middleware
- Add rate limiting
- Validate and sanitize all user inputs
- Use HTTPS in production

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For support, email support@lexease.in or visit the Contact page.

---

**Disclaimer**: LexEase provides templates and AI-generated content for informational purposes only. It does not constitute legal advice. For important legal matters, consult with a qualified lawyer.

