export default function DocumentComponent() {
    const pdfUrl = "https://arxiv.org/pdf/2501.12948";
    
    return (
      <div className="flex flex-col items-center justify-between p-6 w-full max-w-xs min-h-48 bg-[#343a40] rounded-xl shadow-md border border-gray-200">
        <div className="w-full text-center space-y-4">
          <h1 className="text-2xl font-bold white">Document</h1>
          <h2 className="text-white">
            <span className="font-semibold">Description:</span> ML Research
          </h2>
          
          {/* PDF Viewer with iframe */}
          <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
              className="w-full h-full"
              title="PDF Viewer"
            >
              <p className="p-2 text-sm text-gray-500">
                Your browser does not support iframes. 
                <a href={pdfUrl} className="text-blue-500 ml-1">Open PDF directly</a>
              </p>
            </iframe>
          </div>
  
          {/* PDF action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
            >
              Open in New Tab
            </a>
            <a
              href={pdfUrl}
              download="ML-Research-Paper.pdf"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-center"
            >
              Download PDF
            </a>
          </div>
        </div>
        
        <div className="w-full flex justify-end mt-6">
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-sm">
            Delete
          </button>
        </div>
      </div>
    );
  }