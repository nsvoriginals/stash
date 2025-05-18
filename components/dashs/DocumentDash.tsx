import DocumentComponent from "../DocumentComponent"
export default function DocumentDash() {
    return (
        
        <main className="flex-1 bg-[#131515] p-4 overflow-auto">
        <div className="h-full w-full">
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
        
            <DocumentComponent/>
            <DocumentComponent/>
            <DocumentComponent/>
             <DocumentComponent/>
          </div>
        </div>
      </main>

    )
}