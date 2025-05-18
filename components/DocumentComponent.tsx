import { useRouter } from 'next/navigation';

interface DocumentProps {
  id: string;
  title?: string;
  description?: string;
  url: string;
  onDelete?: (id: string) => void;
}

export default function DocumentComponent({
  id,
  title = "Document",
  description = "",
  url,
  onDelete
}: DocumentProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete');
        return;
      }

      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      if (onDelete) {
        onDelete(id);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-6 w-full max-w-xs min-h-48 bg-[#343a40] rounded-xl shadow-md border border-gray-200">
      <div className="w-full text-center space-y-4">
        <h1 className="text-xl font-bold text-white truncate">{title}</h1>
        {description && (
          <h2 className="text-gray-300 text-sm">
            <span className="font-semibold">Description:</span> {description}
          </h2>
        )}
        
        {/* PDF Viewer with iframe */}
        <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            src={`https://docs.google.com/gview?url=${url}&embedded=true`}
            className="w-full h-full"
            title="PDF Viewer"
          >
            <p className="p-2 text-sm text-gray-500">
              Your browser does not support iframes. 
              <a href={url} className="text-blue-500 ml-1">Open PDF directly</a>
            </p>
          </iframe>
        </div>

        {/* PDF action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            Open in New Tab
          </a>
          <a
            href={url}
            download={`${title}.pdf`}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-center"
          >
            Download PDF
          </a>
        </div>
      </div>
      
      <div className="w-full flex justify-end mt-6">
        <button 
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}