import { useEffect, useState } from 'react';
import BookmarkComponent from "../BookMarkComponent";

interface Bookmark {
  id: string;
  title: string;
  description?: string;
  bookmarkLink: string;
}

export default function BookmarkDash() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required');
        }

        const response = await fetch('/api/bookmarks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }

        const data = await response.json();
        setBookmarks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`/api/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete bookmark');
      }

      // Optimistically remove the bookmark from UI
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete bookmark');
    }
  };

  if (loading) {
    return (
      <main className="flex-1 bg-[#131515]-4 overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-white">Loading bookmarks...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 bg-[#131515]-4 overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </main>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <main className="flex-1 bg-[#131515]-4 overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-white">No bookmarks found</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#131515]-4 overflow-auto">
      <div className="h-full w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
          {bookmarks.map((bookmark) => (
            <BookmarkComponent
              key={bookmark.id}
              id={bookmark.id}
              title={bookmark.title}
              description={bookmark.description}
              url={bookmark.bookmarkLink}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
}