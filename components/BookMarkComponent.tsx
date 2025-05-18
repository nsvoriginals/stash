import { useRouter } from 'next/navigation';

interface BookmarkProps {
  id: string;
  title?: string;
  description?: string;
  url: string;
  onDelete?: (id: string) => void;
}

export default function BookmarkComponent({
  id,
  title = "Bookmark",
  description = "",
  url,
  onDelete
}: BookmarkProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete');
        return;
      }

      const response = await fetch(`/api/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete bookmark');
      }

      if (onDelete) {
        onDelete(id);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      alert('Failed to delete bookmark. Please try again.');
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
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            Visit Website
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(url)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-center"
          >
            Copy Link
          </button>
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