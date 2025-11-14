import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Download, Upload, FileText, AlertCircle } from 'lucide-react';
import { manualFileMap } from '../utils/manualMap';

// Correct CSS imports for react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker for Vite (use local worker asset instead of CDN)
// This avoids dynamic import issues and 404s on cdnjs
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const DocumentGenerator = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileUrl, setPdfFileUrl] = useState(null);
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [searchParams] = useSearchParams();

  // Load selected doc PDF if provided, else fall back to first available
  useEffect(() => {
    const init = async () => {
      try {
        const docName = searchParams.get('doc');
        let assetPath = docName ? manualFileMap[docName] : null;

        if (!assetPath) {
          // fallback to Rent Agreement if available
          assetPath = manualFileMap['Rent Agreement'];
        }

        if (assetPath) {
          const response = await fetch(assetPath);
          const arrayBuffer = await response.arrayBuffer();
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const fileName = assetPath.split('/').pop() || 'template.pdf';
          const file = new File([blob], fileName, { type: 'application/pdf' });

          setPdfArrayBuffer(arrayBuffer);
          setPdfFile(file);
          setPdfFileUrl(URL.createObjectURL(file));

          // Set up fields based on doc name if available
          setupFieldsForDoc(docName || 'Rent Agreement');
        }
      } catch (err) {
        console.error('Error loading PDF template:', err);
        setError('Could not load the PDF template. You can upload a file.');
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError('');
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setError('Error loading PDF file. Please try another file.');
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      try {
        setPdfFile(file);
        setPdfFileUrl(URL.createObjectURL(file));
        setFormData({});
        setError('');
        setSuccess(false);
        
        // Read file as ArrayBuffer for processing
        const arrayBuffer = await file.arrayBuffer();
        setPdfArrayBuffer(arrayBuffer);
        
        // Set up sample fields (in a real implementation, you would extract actual fields)
        setupSampleFields();
      } catch (err) {
        console.error('Error processing PDF:', err);
        setError('Error processing PDF file.');
      }
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const setupFieldsForDoc = (docName) => {
    // Define field schemas per known document
    const schemas = {
      'Rent Agreement': [
        { name: 'tenantName', label: 'Tenant Name', type: 'text', required: true },
        { name: 'landlordName', label: 'Landlord Name', type: 'text', required: true },
        { name: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
        { name: 'rentAmount', label: 'Monthly Rent (₹)', type: 'number', required: true },
        { name: 'startDate', label: 'Lease Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'Lease End Date', type: 'date', required: true },
        { name: 'securityDeposit', label: 'Security Deposit (₹)', type: 'number', required: true },
      ],
      'NDA': [
        { name: 'disclosingParty', label: 'Disclosing Party', type: 'text', required: true },
        { name: 'receivingParty', label: 'Receiving Party', type: 'text', required: true },
        { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
        { name: 'term', label: 'Term (months)', type: 'number', required: true },
        { name: 'jurisdiction', label: 'Jurisdiction', type: 'text', required: false },
      ],
      'Employment Contract': [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employerName', label: 'Employer Name', type: 'text', required: true },
        { name: 'position', label: 'Position/Title', type: 'text', required: true },
        { name: 'salary', label: 'Salary (₹)', type: 'number', required: true },
        { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      ],
      'Partnership Agreement': [
        { name: 'firmName', label: 'Firm Name', type: 'text', required: true },
        { name: 'partnerNames', label: 'Partner Names', type: 'textarea', required: true },
        { name: 'capitalContribution', label: 'Capital Contribution (₹)', type: 'number', required: true },
        { name: 'profitShare', label: 'Profit Share (%)', type: 'number', required: true },
      ],
      'Sale Agreement': [
        { name: 'sellerName', label: 'Seller Name', type: 'text', required: true },
        { name: 'buyerName', label: 'Buyer Name', type: 'text', required: true },
        { name: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
        { name: 'consideration', label: 'Consideration (₹)', type: 'number', required: true },
        { name: 'agreementDate', label: 'Agreement Date', type: 'date', required: true },
      ],
      'Will': [
        { name: 'testatorName', label: 'Testator Name', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'textarea', required: true },
        { name: 'beneficiaries', label: 'Beneficiaries', type: 'textarea', required: true },
        { name: 'executor', label: 'Executor', type: 'text', required: false },
      ],
      'Power of Attorney': [
        { name: 'principalName', label: 'Principal Name', type: 'text', required: true },
        { name: 'attorneyName', label: 'Attorney-in-Fact Name', type: 'text', required: true },
        { name: 'powersGranted', label: 'Powers Granted', type: 'textarea', required: true },
        { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      ],
      'Affidavit': [
        { name: 'deponentName', label: 'Deponent Name', type: 'text', required: true },
        { name: 'subject', label: 'Subject/Statement', type: 'textarea', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'place', label: 'Place', type: 'text', required: true },
      ],
    };

    const selected = schemas[docName] || schemas['Rent Agreement'];
    setFields(selected);

    const initialData = {};
    selected.forEach(field => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
  };

  const handleInputChange = async (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear success message when user starts typing
    if (success) setSuccess(false);
    
    // Update PDF preview in real-time
    if (pdfArrayBuffer) {
      try {
        // In a real implementation, you would overlay the text on the PDF
        // For now, we'll just update the preview URL to trigger a re-render
        const newFormData = { ...formData, [fieldName]: value };
        // This would be where you generate an updated PDF preview
      } catch (err) {
        console.error('Error updating PDF preview:', err);
      }
    }
  };

  const validateForm = () => {
    for (const field of fields) {
      if (field.required && (!formData[field.name] || formData[field.name].trim() === '')) {
        setError(`Please fill in the ${field.label}`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const generatePdf = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      if (!pdfArrayBuffer) {
        throw new Error('No PDF file loaded');
      }
      
      // Create a simple text file with the form data as a placeholder
      // In a real implementation, you would generate an actual PDF
      let content = "Generated Document\n\n";
      fields.forEach(field => {
        content += `${field.label}: ${formData[field.name]}\n`;
      });
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'generated-document.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch (err) {
      console.error('Error generating document:', err);
      setError('Failed to generate document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Generator</h1>
          <p className="text-lg text-gray-600">
            Fill in the form to generate your legal document
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Document generated successfully! Check your downloads folder.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left side - Form */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl font-semibold text-gray-900">Document Information</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Fill in the details below to generate your document
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload PDF Template
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </button>
                  <span className="text-sm text-gray-500 truncate">
                    {pdfFile ? pdfFile.name : 'No file chosen'}
                  </span>
                </div>
              </div>

              {fields.length > 0 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-medium text-gray-900">Fill in the Details</h3>
                  
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          rows="3"
                          required={field.required}
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <button
                      onClick={generatePdf}
                      disabled={loading}
                      className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Generate and Download Document
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - PDF Preview */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl font-semibold text-gray-900">Document Preview</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Preview of your document with filled data
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[500px] flex flex-col items-center justify-center bg-gray-50">
                {pdfFileUrl ? (
                  <div className="w-full">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <Document
                        file={pdfFileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                          <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                          </div>
                        }
                      >
                        <Page 
                          pageNumber={pageNumber} 
                          width={Math.min(600, window.innerWidth * 0.4)}
                        />
                      </Document>
                    </div>
                    
                    {numPages > 1 && (
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                          disabled={pageNumber <= 1}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-gray-700">
                          Page {pageNumber} of {numPages}
                        </span>
                        <button
                          onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                          disabled={pageNumber >= numPages}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No document preview</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload a PDF to see the preview
                    </p>
                  </div>
                )}
              </div>
              
              <div className="text-center text-sm text-gray-500">
                <p>Note: Form data will be overlaid on the PDF in the final version</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentGenerator;
