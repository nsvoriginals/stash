"use client"
import { useState } from 'react';
import Form from "@/components/Form";
import Sidebar from "@/components/Sidebar";
import TodoDash from '@/components/TodoDash';
import TodoComponent from '@/components/TodoComponent';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden relative">
      {/* Navbar - fixed height */}
      <div className="h-16 bg-[#131515] text-white flex items-center justify-center w-full border-b">
        <h1 className="text-4xl">Dashboard</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-white text-black rounded-lg px-5 py-3 text-1xl ml-20 hover:bg-gray-200 transition-colors"
        >
          Create new stash
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden h-full">
        <Sidebar />
        <TodoDash></TodoDash>
      </div>

      {showForm && (
        <>
          
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowForm(false)}
          />
          
          
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
  )
}