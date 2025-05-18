import { useEffect } from 'react';
import { Tweet } from 'react-tweet';
import { useRouter } from 'next/navigation';

interface TweetComponentProps {
  id: string;
  tweetId: string;
  description?: string;
  onDelete?: (id: string) => void;
}

export default function TweetComponent({
  id,
  tweetId,
  description = "",
  onDelete
}: TweetComponentProps) {
  const router = useRouter();

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete');
        return;
      }

      const response = await fetch(`/api/tweets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete tweet');
      }

      if (onDelete) {
        onDelete(id);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting tweet:', error);
      alert('Failed to delete tweet. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-6 w-full max-w-md bg-[#343a40] rounded-xl shadow-md border border-gray-200">
      <div className="w-full space-y-4">
        <div className="twitter-tweet-container">
          <div className="dark">
            <Tweet id={tweetId} />
          </div>
        </div>
        {description && (
          <p className="text-gray-300 text-sm">
            <span className="font-semibold">Description:</span> {description}
          </p>
        )}
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