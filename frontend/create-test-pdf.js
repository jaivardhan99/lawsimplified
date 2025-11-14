import { PDFDocument, StandardFonts } from 'pdf-lib';
import { promises as fs } from 'fs';

async function createTestPdf() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  // Add a page
  const page = pdfDoc.addPage([600, 400]);
  
  // Add title
  page.drawText('Rental Agreement Form', {
    x: 50,
    y: 350,
    size: 20,
    font: helveticaFont,
  });
  
  // Add form fields with labels
  const fields = [
    { label: 'Tenant Name:', x: 50, y: 300, fieldName: 'tenantName' },
    { label: 'Landlord Name:', x: 50, y: 270, fieldName: 'landlordName' },
    { label: 'Property Address:', x: 50, y: 240, fieldName: 'propertyAddress' },
    { label: 'Monthly Rent (Rs.):', x: 50, y: 210, fieldName: 'rentAmount' },
    { label: 'Start Date:', x: 50, y: 180, fieldName: 'startDate' },
    { label: 'End Date:', x: 50, y: 150, fieldName: 'endDate' },
    { label: 'Security Deposit (Rs.):', x: 50, y: 120, fieldName: 'securityDeposit' },
  ];
  
  // Create form
  const form = pdfDoc.getForm();
  
  // Add fields to the PDF
  fields.forEach((field, index) => {
    // Draw label
    page.drawText(field.label, {
      x: field.x,
      y: field.y,
      size: 12,
      font: helveticaFont,
    });
    
    // Create text field
    const textField = form.createTextField(field.fieldName);
    textField.setText('');
    textField.addToPage(page, {
      x: field.x + 150,
      y: field.y - 10,
      width: 200,
      height: 20,
    });
  });
  
  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  
  // Write the PDF to a file
  await fs.writeFile('test-form.pdf', pdfBytes);
  
  console.log('Test PDF with form fields created successfully!');
}

createTestPdf().catch(err => console.error('Error creating PDF:', err));