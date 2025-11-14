// Utility functions for PDF processing
import { PDFDocument } from 'pdf-lib';

/**
 * Extract form fields from a PDF document
 * @param {ArrayBuffer} pdfBytes - The PDF file as ArrayBuffer
 * @returns {Promise<Array>} - Array of field objects with name and type
 */
export const extractPdfFields = async (pdfBytes) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    
    const fieldData = fields.map(field => {
      const name = field.getName();
      const type = field.constructor.name;
      
      // Map PDF field types to HTML input types
      let inputType = 'text';
      if (type.includes('CheckBox')) {
        inputType = 'checkbox';
      } else if (type.includes('Dropdown')) {
        inputType = 'select';
      } else if (type.includes('TextField')) {
        inputType = 'text';
      }
      
      return {
        name,
        label: name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), // Add spaces before capital letters
        type: inputType,
        required: false
      };
    });
    
    return fieldData;
  } catch (error) {
    console.warn('Could not extract PDF fields:', error);
    // Return sample fields as fallback
    return [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'signature', label: 'Signature', type: 'text', required: true }
    ];
  }
};

/**
 * Fill a PDF form with provided data
 * @param {ArrayBuffer} pdfBytes - The PDF file as ArrayBuffer
 * @param {Object} formData - Object containing field names and values
 * @returns {Promise<Uint8Array>} - Modified PDF as Uint8Array
 */
export const fillPdfForm = async (pdfBytes, formData) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    
    // Fill each field with corresponding data
    Object.keys(formData).forEach(fieldName => {
      try {
        const field = form.getField(fieldName);
        if (field) {
          if (field.constructor.name.includes('TextField')) {
            field.setText(formData[fieldName]);
          } else if (field.constructor.name.includes('CheckBox')) {
            if (formData[fieldName]) {
              field.check();
            } else {
              field.uncheck();
            }
          }
        }
      } catch (error) {
        console.warn(`Could not fill field ${fieldName}:`, error);
      }
    });
    
    // Flatten the form to make fields non-editable
    form.flatten();
    
    return await pdfDoc.save();
  } catch (error) {
    console.error('Error filling PDF form:', error);
    throw error;
  }
};