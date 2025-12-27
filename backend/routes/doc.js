import express from 'express'
import Template from '../models/Template.js'
import { generateDocument } from '../services/docService.js'

const router = express.Router()

// Get all templates
router.get('/docs', async (req, res) => {
  try {
    const templates = await Template.find({ isActive: true })
      .select('-templateContent')
      .sort({ createdAt: -1 })

    res.json(templates)
  } catch (error) {
    console.error('Error fetching docs:', error)
    res.status(500).json({ error: 'Failed to fetch documents' })
  }
})

// Generate PDF from HTML
import { htmlToPdf } from '../services/pdfService.js'

router.post('/generate-pdf', async (req, res) => {
  try {
    const { html } = req.body;
    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const pdfBuffer = await htmlToPdf(html);
    console.log(`Generated PDF size: ${pdfBuffer.length} bytes`);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Generate document (AI)
router.post('/generateDoc', async (req, res) => {
  try {
    const { docType, conversation, userId } = req.body

    if (!docType || !conversation || !userId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const template = await Template.findOne({ name: docType, isActive: true })

    if (!template) {
      return res.status(404).json({ error: 'Template not found' })
    }

    const document = await generateDocument(template, conversation)

    res.json({
      document,
      docType: template.name,
      category: template.category
    })
  } catch (error) {
    console.error('Error generating doc:', error)
    res.status(500).json({ error: 'Failed to generate document' })
  }
})

export default router

