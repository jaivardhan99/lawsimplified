import express from 'express'
import multer from 'multer'
import LawyerLead from '../models/LawyerLead.js'
import { sendLawyerLeadEmail } from '../services/emailService.js'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'))
    }
  }
})

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { issueType, name, email, phone, message } = req.body

    if (!issueType || !name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const lawyerLead = new LawyerLead({
      issueType,
      name,
      email,
      phone,
      message,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      fileName: req.file ? req.file.originalname : null,
      status: 'pending'
    })

    await lawyerLead.save()

    // Send email to partner lawyers
    try {
      await sendLawyerLeadEmail(lawyerLead)
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails
    }

    res.json({
      success: true,
      message: 'Request submitted successfully',
      leadId: lawyerLead._id
    })
  } catch (error) {
    console.error('Lawyer lead error:', error)
    res.status(500).json({ error: 'Failed to submit request' })
  }
})

export default router

