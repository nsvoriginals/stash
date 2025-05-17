export default function Sidebar() {
    return (
      <div className="flex flex-col items-center justify-between  bg-[#131515] w-[20%] min-w-[250px] h-[90] p-6 transition-all duration-300 ease-in-out">
        
        <div className="flex flex-col items-center gap-10 w-full">
          <h1 className="text-red-500 text-3xl font-bold tracking-tighter hover:text-red-400 transition-colors duration-200">
           / Stash
          </h1>
          
         
          <nav className="flex flex-col items-center w-full gap-4">
            {['Todos','Tweets', 'Notes','Images', 'Videos', 'Documents', 'Bookmarks', 'Settings'].map((item) => (
              <button
                key={item}
                className="w-full py-3 px-4 text-white/80 hover:text-white hover:bg-gray-700 rounded-lg text-lg font-medium transition-all duration-200 hover:translate-x-1 hover:shadow-md flex items-center gap-3"
              >
                <span className="block w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {item}
              </button>
            ))}
          </nav>
        </div>
  
      
        <button className="w-full py-3 px-4 mt-6 text-white/80 hover:text-white hover:bg-gray-700 rounded-lg text-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>
          Logout
        </button>
      </div>
    )
  }