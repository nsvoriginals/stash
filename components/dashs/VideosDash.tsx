import VideoComponent from "../VideoComponent"
export default function VideoDash() {
    return (
        
        <main className="flex-1 bg-[#131515] p-4 overflow-auto">
        <div className="h-full w-full">
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
        
            <VideoComponent/>
            <VideoComponent/>
            <VideoComponent/>
             <VideoComponent/>
          </div>
        </div>
      </main>

    )
}