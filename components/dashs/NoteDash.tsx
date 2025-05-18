import { useEffect, useState } from 'react';
import NoteComponent from "../NoteComponent";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NoteDash() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        const response = await fetch('/api/notes', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch notes');

        setNotes(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete note');

      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
    }
  };

  return (
    <main className="flex-1 bg-[#131515] p-4 overflow-auto">
      <div className="h-full w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading notes...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">{error}</div>
        ) : notes.length === 0 ? (
          <div className="flex items-center justify-center h-full">No notes found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
            {notes.map((note) => (
              <NoteComponent
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}