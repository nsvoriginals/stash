import TodoComponent from "./TodoComponent"
export default function TweetsDash() {
    return (
        
        <main className="flex-1 bg-white p-4 overflow-auto">
        <div className="h-full w-full">
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
            <TodoComponent />
            <TodoComponent />
            <TodoComponent />
            <TodoComponent />
          
          </div>
        </div>
      </main>

    )
}