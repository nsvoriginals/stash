import BookMarkComponent from "./BookMarkComponent"
import BookmarkComponent from "./BookMarkComponent"
import DocumentComponent from "./DocumentComponent"
import ImageComponent from "./ImageComponent"
import NoteComponent from "./NoteComponent"
import TodoComponent from "./TodoComponent"
import TweetsComponent from "./TweetsComponent"
import VideoComponent from "./VideoComponent"
export default function TodoDash() {
    return (
        
        <main className="flex-1 bg-white p-4 overflow-auto">
        <div className="h-full w-full">
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
            <TweetsComponent />
            <TodoComponent />
            <NoteComponent />
            <ImageComponent />
            <VideoComponent></VideoComponent>
            <DocumentComponent></DocumentComponent>
            <BookmarkComponent/>
          
          </div>
        </div>
      </main>

    )
}