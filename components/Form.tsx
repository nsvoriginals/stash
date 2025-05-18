"use client";

import { useState } from 'react';

interface FormProps {
  onClose: () => void;
}

export default function Form({ onClose }: FormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    category: ''
  });

  const categories = ['Article', 'Video', 'Tutorial', 'Documentation', 'Tool'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    onClose();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-6 w-full"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add New Resource</h2>
      
      {/* Title Field */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Enter title"
        />
      </div>
      
      {/* Description Field */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Enter description"
        />
      </div>
      
      {/* Link Field */}
      <div className="space-y-2">
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
          Link *
        </label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="https://example.com"
        />
      </div>
      
      {/* Category Selection */}
      <div className="space-y-2">
        <p className="block text-sm font-medium text-gray-700">Category *</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                formData.category === category
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#131515] text-white rounded-md hover:bg-[#1a1a1a] transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
}