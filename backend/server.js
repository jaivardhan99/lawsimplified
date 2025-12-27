import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// Load env vars BEFORE importing other files that might use them
dotenv.config()

import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import chatRoutes from './routes/chat.js'
import docRoutes from './routes/doc.js'
import paymentRoutes from './routes/payment.js'
import lawyerRoutes from './routes/lawyer.js'
import contactRoutes from './routes/contact.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
// Use PORT from environment or default to 5000, but try alternative ports if needed
const PORT = process.env.PORT || 5000

// Middleware
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')))

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lexease'
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message)
    console.warn('Continuing without database. Some features may not work.')
    console.warn('To fix: Make sure MongoDB is running or set MONGODB_URI in .env')
  })

// Routes
app.use('/api/chat', chatRoutes)
app.use('/api', docRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/lawyerLead', lawyerRoutes)
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LexEase API is running' })
})

// Function to start server on available port
function startServer(port, maxPort = 5100) {
  // If we've tried too many ports, give up
  if (port > maxPort) {
    console.error(`Could not find an available port between ${PORT} and ${maxPort}`)
    process.exit(1)
  }

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}`)
      startServer(parseInt(port) + 1, maxPort)
    } else {
      console.error(err)
    }
  })
}

// Start server with a wider range of ports
startServer(parseInt(PORT), 5100)