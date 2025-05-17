import { useState } from 'react';

interface NoteProps {
  title?: string;
  content?: string;
  onDelete?: () => void;
}

export default function NoteComponent({
  title = "Note",
  content = "Routing Notes",
  onDelete
}: NoteProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`flex flex-col justify-between p-5 w-full max-w-xs min-h-[12rem] bg-[#343a40] rounded-xl shadow-md border border-gray-200 transition-all duration-200 ${
        isHovered ? 'shadow-lg' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-3">
        <h1 className="text-xl font-bold text-white truncate">{title}</h1>
        <div className="text-white">
          <p className="whitespace-pre-wrap break-words">hello there in networking routing is a special concept where its easy to manipulate the apis endpoints like the best way to constiute</p>
        </div>
      </div>
      
      <div className={`flex justify-end mt-4 transition-opacity ${
        isHovered ? 'opacity-100' : 'opacity-70'
      }`}>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-sm">
            Delete
          </button>
      </div>
    </div>
  );
}