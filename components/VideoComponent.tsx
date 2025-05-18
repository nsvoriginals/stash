import YouTube from "react-youtube";
import { YouTubeProps } from "react-youtube";
import { useRouter } from "next/navigation";

interface VideoComponentProps {
  id: string;
  title: string;
  description?: string;
  videoId: string;
  onDelete?: (id: string) => void;
}

export default function VideoComponent({
  id,
  title,
  description = "",
  videoId,
  onDelete
}: VideoComponentProps) {
  const router = useRouter();

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '200',
    width: '300',
    playerVars: {
      autoplay: 0, // Changed to 0 for better UX
      modestbranding: 1, // Removes YouTube logo
      rel: 0 // Disables related videos at the end
    },
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete');
        return;
      }

      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      // Call onDelete callback if provided
      if (onDelete) {
        onDelete(id);
      } else {
        // Default behavior: refresh the page
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video. Please try again.');
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
          <YouTube 
            videoId={videoId} 
            opts={opts} 
            onReady={onPlayerReady}
            iframeClassName="rounded-lg"
          />
        </div>
      </div>
      
      <div className="w-full flex justify-end mt-4">
        <button 
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
          aria-label="Delete video"
        >
          Delete
        </button>
      </div>
    </div>
  );
}