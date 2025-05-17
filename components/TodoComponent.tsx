export default function TodoComponent() {
    return (
      <div className="flex flex-col items-center justify-between p-6 w-full max-w-xs min-h-48 bg-white rounded-xl shadow-md border border-gray-200">
        <div className="w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Todo</h1>
          <h2 className="text-gray-600">
            <span className="font-semibold">Description:</span> Buy groceries
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="font-semibold text-gray-600">Status:</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              Completed
            </span>
          </div>
        </div>
        
        <div className="w-full flex justify-end mt-6">
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-sm">
            Delete
          </button>
        </div>
      </div>
    )
  }