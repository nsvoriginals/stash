import YouTube from "react-youtube";
import { YouTubeProps } from "react-youtube";
export default function VideoComponent(this: any) {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    
      const opts: YouTubeProps['opts'] = {
        height: '200',
        width: '300',
        playerVars: {
         
          autoplay: 1,
        },
      };
    return (
      <div className="flex flex-col items-center justify-between p-6 w-full max-w-xs min-h-48 bg-[#343a40] rounded-xl shadow-md border border-gray-200">
        <div className="w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-white-800">Video</h1>
          <h2 className="text-white-600">
            <span className="font-semibold">Description:</span> Tarun Speaks
          </h2>
          <div className="flex items-center justify-center gap-2">
            <YouTube videoId={'dW9ljF7q6wo'} opts={opts} onReady={onPlayerReady}></YouTube>
          </div>
        </div>
        
        <div className="w-full flex justify-end mt-4">
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-sm">
            Delete
          </button>
        </div>
      </div>
    )
  }