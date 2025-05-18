import { useEffect, useState } from 'react';
import DocumentComponent from "../DocumentComponent";

interface Document {
  id: string;
  title: string;
  description?: string;
  docLink: string;
}

export default function DocumentDash() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        const response = await fetch('/api/documents', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch documents');

        setDocuments(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete document');

      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
    }
  };

  return (
    <main className="flex-1 bg-[#131515] p-4 overflow-auto">
      <div className="h-full w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading documents...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">{error}</div>
        ) : documents.length === 0 ? (
          <div className="flex items-center justify-center h-full">No documents found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
            {documents.map((doc) => (
              <DocumentComponent
                key={doc.id}
                id={doc.id}
                title={doc.title}
                description={doc.description}
                url={doc.docLink}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}