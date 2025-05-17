"use client";

import { useState } from 'react';
import Form from "@/components/Form";
import Sidebar from "@/components/Sidebar";
import BookmarkDash from '@/components/dashs/BookMarkDash';
import TodoComponent from '@/components/TodoComponent';
import ImageDash from '@/components/dashs/ImageDash';
import DocumentDash from '@/components/dashs/DocumentDash';
import VideoDash from '@/components/dashs/VideosDash';
import NoteDash from '@/components/dashs/NoteDash';
import TweetsDash from '@/components/dashs/TweetsDash';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('Todos');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Todos':
        return <TodoComponent />;
      case 'Tweets':
        return <TweetsDash />;
      case 'Notes':
        return <NoteDash />;
      case 'Images':
        return <ImageDash />;
      case 'Videos':
        return <VideoDash />;
      case 'Documents':
        return <DocumentDash />;
      case 'Bookmarks':
        return <BookmarkDash />;
      case 'Settings':
        return <div>Settings Component</div>;
      default:
        return <TodoComponent />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden relative">
      <div className="h-20 bg-[#131515] text-white flex items-center justify-around gap-10 w-full border-b">
        <div className='flex items-center justify-start text-2xl'> <h1>DASHBOARD</h1></div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-white text-black rounded-lg px-5 py-3 text-1xl ml-20 hover:bg-gray-200 transition-colors"
        >
          + Create new stash
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto bg-[#131515] p-6">
          {renderActiveTab()}
        </div>
      </div>

      {showForm && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowForm(false)}
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl h-3/4 overflow-y-auto">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Form />
            </div>
          </div>
        </>
      )}
    </div>
  );
}