import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NoteProps {
  id: string;
  title?: string;
  content?: string;
  onDelete?: (id: string) => void;
}

export default function NoteComponent({
  id,
  title = "Note",
  content = "Routing Notes",
  onDelete
}: NoteProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete');
        return;
      }

      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      if (onDelete) {
        onDelete(id);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  return (
    <div 
      className={`flex flex-col justify-between p-5 w-full max-w-xs min-h-[12rem] bg-[#343a40] rounded-xl shadow-md border border-gray-200 transition-all duration-200 ${
        isHovered ? 'shadow-lg' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-3">
        <h1 className="text-xl font-bold text-white truncate">{title}</h1>
        <div className="text-white">
          <p className="whitespace-pre-wrap break-words">{content}</p>
        </div>
      </div>
      
      <div className={`flex justify-end mt-4 transition-opacity ${
        isHovered ? 'opacity-100' : 'opacity-70'
      }`}>
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