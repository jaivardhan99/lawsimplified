import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

let transporter = null
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

export async function sendLawyerLeadEmail(lead) {
  if (!transporter) {
    console.log('Email not configured. Lawyer lead saved to database.')
    return Promise.resolve()
  }

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.LAWYER_EMAIL || process.env.SMTP_USER,
    subject: `New Lawyer Lead: ${lead.issueType}`,
    html: `
      <h2>New Lawyer Lead Request</h2>
      <p><strong>Issue Type:</strong> ${lead.issueType}</p>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${lead.message}</p>
      ${lead.fileUrl ? `<p><strong>Attachment:</strong> ${lead.fileName}</p>` : ''}
      <p><strong>Lead ID:</strong> ${lead._id}</p>
      <p><strong>Submitted:</strong> ${lead.createdAt}</p>
    `
  }

  return transporter.sendMail(mailOptions)
}

export async function sendContactEmail({ name, email, subject, message }) {
  if (!transporter) {
    console.log('Email not configured. Contact form submission received.')
    return Promise.resolve()
  }

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `Contact Form: ${subject}`,
    replyTo: email,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  }

  return transporter.sendMail(mailOptions)
}

