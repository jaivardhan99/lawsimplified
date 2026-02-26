# LexEase - AI-Powered Legal Documentation Platform

## Project Overview
LexEase is a comprehensive full-stack legal-tech platform designed to democratize access to legal documentation in India to optimize the legal documentation process. It combines generative AI with standard legal frameworks to allow users to draft, customize, and download legally compliant documents (like Rent Agreements) in minutes without expensive legal counsel.

## Key Features & Technical Implementation

*   **Dynamic Document Generation Engine**: 
    *   Engineered a split-screen React interface with real-time bidirectional binding; users fill dynamic forms (Left) while instantly visualizing the final PDF layout (Right).
    *   Implemented a robust backend service using **Puppeteer** to convert complex HTML/CSS templates into high-fidelity, print-ready PDFs with pixel-perfect precision.

*   **AI Legal Advisor Integration**:
    *   Integrated **Google Gemini / OpenAI APIs** to build a context-aware legal chatbot. 
    *   Designed prompt engineering workflows to analyze user queries, recommend appropriate legal templates, and simplify complex legal jargon for laypersons.

*   **Full-Stack Architecture (MERN)**:
    *   **Frontend**: Built a responsive, high-performance client using **React 18**, **Vite**, and **TailwindCSS**, ensuring distinct design aesthetics and rapid load times.
    *   **Backend**: Developed a RESTful API with **Node.js** and **Express**, featuring secure routes, middleware for error handling, and modular service layers.
    *   **Database**: Modeled complex data relationships (Users, Templates, Transactions) using **MongoDB** and **Mongoose** for efficient data retrieval and scalability.

*   **Third-Party Integrations**:
    *   **Authentication**: Implemented secure user authentication flows (Google Sign-In) using **Firebase Auth**.
    *   **Payments**: Integrated **Razorpay** payment gateway to handle secure transactions for premium document downloads and subscriptions.
    *   **Communication**: Configured **Nodemailer** for automated transactional emails and lawyer connection requests.

## Tech Stack keywords
**React**, **Node.js**, **Express**, **MongoDB**, **TailwindCSS**, **Firebase Auth**, **OpenAI API / Google Gemini**, **Puppeteer**, **Razorpay**, **Vite**.
