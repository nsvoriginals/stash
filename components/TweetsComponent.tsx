import { useEffect } from 'react';
import { Tweet } from 'react-tweet';

export default function TweetsComponent() {
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

  return (
    <div className="flex flex-col items-center justify-between p-6 w-full max-w-md bg-[#343a40] rounded-xl shadow-md border border-gray-200">
      <div className="w-full space-y-4">
        
        <div className="twitter-tweet-container">
        <div className="dark">
  <Tweet id="1923640414999110103" />
</div>
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