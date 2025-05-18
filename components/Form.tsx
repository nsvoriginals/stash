"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormProps {
  onClose: () => void;
}

type ContentType = 'todo' | 'note' | 'bookmark' | 'video' | 'document' | 'tweet' | 'image';

export default function Form({ onClose }: FormProps) {
  const router = useRouter();
  const [contentType, setContentType] = useState<ContentType>('todo');
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    status: 'TODO',
    content: '',
    link: '',
    category: ''
  });

  const contentTypes: { id: ContentType; label: string }[] = [
    { id: 'todo', label: 'Todo' },
    { id: 'note', label: 'Note' },
    { id: 'bookmark', label: 'Bookmark' },
    { id: 'video', label: 'Video' },
    { id: 'document', label: 'Document' },
    { id: 'tweet', label: 'Tweet' },
    { id: 'image', label: 'Image' },
  ];

  const statusOptions = ['TODO', 'IN_PROGRESS', 'DONE'];
  const categories = ['Article', 'Video', 'Tutorial', 'Documentation', 'Tool'];

  useEffect(() => {
    // Reset form when content type changes
    setFormData({
      title: '',
      description: '',
      status: 'TODO',
      content: '',
      link: '',
      category: ''
    });
  }, [contentType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData((prev: any) => ({
      ...prev,
      category
    }));
  };

  const handleStatusSelect = (status: string) => {
    setFormData((prev: any) => ({
      ...prev,
      status
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first');
      return;
    }

    try {
      let payload: any = { title: formData.title };
      
      // Add fields specific to each content type
      switch (contentType) {
        case 'todo':
          payload = { ...payload, description: formData.description, status: formData.status };
          break;
        case 'note':
          payload = { ...payload, content: formData.content };
          break;
        case 'bookmark':
          payload = { ...payload, description: formData.description, bookmarkLink: formData.link };
          break;
        case 'video':
          payload = { ...payload, description: formData.description, vidLink: formData.link };
          break;
        case 'document':
          payload = { ...payload, description: formData.description, docLink: formData.link };
          break;
        case 'tweet':
          payload = { ...payload, description: formData.description, tweetUrl: formData.link };
          break;
        case 'image':
          payload = { ...payload, description: formData.description, imgLink: formData.link };
          break;
      }

      const response = await fetch(`/api/${contentType}s`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create item');
      }

      const data = await response.json();
      console.log('Created successfully:', data);
      onClose();
      router.refresh(); // Refresh the page to show new item
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to create item. Please try again.');
    }
  };

  const renderContentSpecificFields = () => {
    switch (contentType) {
      case 'todo':
        return (
          <>
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
            <div className="space-y-2">
              <p className="block text-sm font-medium text-gray-700">Status *</p>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleStatusSelect(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.status === status
                        ? 'bg-black text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      case 'note':
        return (
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your note content"
            />
          </div>
        );
      case 'bookmark':
      case 'video':
      case 'document':
      case 'tweet':
      case 'image':
        return (
          <>
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
            <div className="space-y-2">
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                {contentType === 'tweet' ? 'Tweet URL *' : 'Link *'}
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder={
                  contentType === 'tweet' ? 
                  'https://twitter.com/username/status/1234567890' : 
                  'https://example.com'
                }
              />
            </div>
            {contentType === 'bookmark' && (
              <div className="space-y-2">
                <p className="block text-sm font-medium text-gray-700">Category</p>
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
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-6 w-full text-black"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add New {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</h2>
      
      {/* Content Type Selection */}
      <div className="space-y-2">
        <p className="block text-sm font-medium text-gray-700">Content Type *</p>
        <div className="flex flex-wrap gap-2">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setContentType(type.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                contentType === type.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Title Field (common to all content types) */}
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
      
      {/* Content-specific fields */}
      {renderContentSpecificFields()}
      
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