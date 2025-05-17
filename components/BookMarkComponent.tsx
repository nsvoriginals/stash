export default function BookmarkComponent() {

    return (
      <div className="flex flex-col items-center justify-between p-6 w-full max-w-xs min-h-48 bg-white rounded-xl shadow-md border border-gray-200">
        <div className="w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Title</h1>
          <h2 className="text-gray-600">
            <span className="font-semibold">Description:</span> Imprt
          </h2>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a 
              href="https://github.com/pdf-viewer-react/starter-rp-next-ts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
            >
              Visit Website
            </a>
            <button
              onClick={() => navigator.clipboard.writeText("https://github.com/pdf-viewer-react/starter-rp-next-ts")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-center"
            >
              Copy Link
            </button>
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