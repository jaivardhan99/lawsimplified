# Document Generator Feature

## Overview
The Document Generator is a React component that allows users to fill out legal document templates with a form-based interface. It provides a split-screen view with a form on the left and a PDF preview on the right.

## Features
1. PDF Upload - Users can upload their own PDF templates
2. Field Extraction - Automatically detects form fields in PDFs (when available)
3. Real-time Preview - Shows filled data overlaid on the PDF
4. PDF Generation - Generates and downloads completed documents

## Implementation Details

### Technologies Used
- **React** - Frontend framework
- **react-pdf** - PDF rendering in the browser
- **pdf-lib** - PDF manipulation and generation
- **Lucide React** - Icons

### Component Structure
```
DocumentGenerator.jsx
├── Form Section (Left)
│   ├── File Upload
│   ├── Dynamic Form Fields
│   └── Generate Button
└── Preview Section (Right)
    ├── PDF Viewer
    └── Data Overlay
```

### Key Functions

#### 1. PDF Field Extraction
```javascript
extractPdfFields(pdfBytes)
```
Attempts to extract actual form fields from a PDF. Falls back to sample fields if extraction fails.

#### 2. PDF Form Filling
```javascript
fillPdfForm(pdfBytes, formData)
```
Fills a PDF form with user data and flattens it to create a non-editable document.

#### 3. Preview Overlay
```javascript
createPreviewOverlay(formData, pageWidth, pageHeight)
```
Creates visual overlays to show how the filled data will appear on the PDF.

## How It Works

1. **PDF Loading**: When a user uploads a PDF or the default rental.pdf is loaded, the system attempts to extract form fields.

2. **Form Generation**: Based on extracted or sample fields, the system dynamically generates form inputs on the left side.

3. **Real-time Preview**: As users fill out the form, data is overlaid on the PDF preview using absolutely positioned elements.

4. **PDF Generation**: When the user clicks "Download PDF", the system fills the actual PDF form fields and generates a downloadable file.

## Limitations

1. **Field Detection**: True field detection requires PDFs with actual form fields. For PDFs with only text placeholders, the system falls back to sample fields.

2. **Positioning**: The preview overlay uses simplified positioning. In a production environment, you would extract actual field coordinates.

3. **Complex Forms**: Advanced PDF features like JavaScript actions are not supported.

## Future Improvements

1. **Better Field Detection**: Implement OCR to detect text placeholders in PDFs without form fields.

2. **Precise Positioning**: Extract actual field positions from PDFs for accurate overlay placement.

3. **Signature Support**: Add drawing canvas for signature fields.

4. **Template Library**: Create a library of common legal document templates.

5. **Validation Rules**: Add field-specific validation (e.g., date formats, numeric ranges).

## Usage

1. Navigate to `/document-generator` in the application
2. Upload a PDF template or use the default rental agreement
3. Fill in the form fields on the left
4. Preview the document on the right
5. Click "Download PDF" to generate and download the completed document

## Code Structure

```
src/
├── pages/
│   └── DocumentGenerator.jsx    # Main component
├── utils/
│   └── pdfUtils.js              # PDF processing utilities
└── public/
    └── rental.pdf               # Sample document template
```

## Dependencies

```json
{
  "react-pdf": "^7.0.0",
  "pdfjs-dist": "^3.0.0",
  "pdf-lib": "^1.17.0"
}
```

## API Integration

The component works entirely client-side and doesn't require backend integration for basic functionality. However, for production use, you might want to:

1. Store completed documents
2. Implement user document libraries
3. Add collaboration features
4. Integrate with document signing services

## Styling

The component uses Tailwind CSS classes for styling, following the existing color scheme:
- Primary Blue: `#2563eb` (text-primary-600, bg-primary-600)
- Deep Blue: `#1e3a8a` (text-deep-blue)
- Gold: `#d4af37` (text-gold-500, bg-gold-500)
- Soft White: `#f8fafc` (bg-soft-white)

## Error Handling

The component includes comprehensive error handling for:
- Invalid file uploads
- PDF processing errors
- Field extraction failures
- Generation errors

Users are shown appropriate error messages and fallback options.