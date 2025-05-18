import { useRouter } from 'next/navigation';

interface ImageComponentProps {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  onDelete?: (id: string) => void;
}

export default function ImageComponent({
  id,
  title,
  description = "",
  imageUrl,
  onDelete
}: ImageComponentProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete');
        return;
      }

      const response = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      if (onDelete) {
        onDelete(id);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. Please try again.');
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
        <div className="flex items-center justify-center gap-2">
          <img 
            src={imageUrl} 
            alt={title} 
            className="max-h-40 rounded-lg object-contain"
          />
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