# Chatbot Troubleshooting

Hello! It looks like you're having trouble with the chatbot. Here are the most likely causes and how to solve them.

## Problem: The chatbot is not responding or shows an error.

This usually happens when the frontend application cannot connect to the backend server. Even though I have updated the code for both the frontend and backend, the changes may not be reflected if the server is not running with the latest code.

### Solution: Restart the Backend Server

The development server uses `node --watch`, which is supposed to automatically restart when files change. However, sometimes this process can fail, leaving an old version of the server running.

To ensure the latest code is active, you need to manually restart the server:

1.  **Stop the current server:** In the terminal where you ran `npm run dev`, press `Ctrl+C` to stop all processes.
2.  **Ensure the port is free:** Make sure no other `node` or server processes are still running and occupying port 5000. You can check this in your operating system's Task Manager or by using a command-line tool.
3.  **Restart the server:** Run `npm run dev` again in the project's root directory.

This will start both the frontend and backend servers with the latest code, and should resolve the connection issue.

---

## Problem: The chatbot says "The AI service is not configured."

This error means the backend server is running, but it cannot find the Gemini API Key needed to connect to the AI service.

### Solution: Create a `.env` file

The project uses a `.env` file to store sensitive information like API keys. I have created a template for you at `backend/.env.example`.

1.  **Navigate to the `backend` directory.**
2.  **Create a copy** of the `backend/.env.example` file and name it `.env`.
3.  **Open the new `.env` file** in a text editor.
4.  **Replace the placeholder** `"YOUR_API_KEY_HERE"` with your actual Gemini API key.
5.  **Save the file.**
6.  **Restart the backend server** one more time (as described above) for it to load the new `.env` file.
