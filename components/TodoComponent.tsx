import { useRouter } from 'next/navigation';

interface TodoComponentProps {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  onDelete?: (id: string) => void;
}

export default function TodoComponent({
  id,
  title,
  description = "",
  status,
  onDelete
}: TodoComponentProps) {
  const router = useRouter();

  const statusColors = {
    'TODO': 'bg-gray-100 text-gray-800',
    'IN_PROGRESS': 'bg-yellow-100 text-yellow-800',
    'DONE': 'bg-green-100 text-green-800'
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete');
        return;
      }

      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      if (onDelete) {
        onDelete(id);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-6 w-full max-w-xs min-h-48 bg-[#343a40] rounded-xl shadow-md border border-gray-200">
      <div className="w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-white truncate">{title}</h1>
        {description && (
          <h2 className="text-white">
            <span className="font-semibold">Description:</span> {description}
          </h2>
        )}
        <div className="flex items-center justify-center gap-2">
          <span className="font-semibold text-white">Status:</span>
          <span className={`px-3 py-1 text-sm rounded-full ${statusColors[status]}`}>
            {status}
          </span>
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