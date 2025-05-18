import { useEffect, useState } from 'react';
import ImageComponent from "../ImageComponent";

interface Image {
  id: string;
  title: string;
  description?: string;
  imgLink: string;
}

export default function ImageDash() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        const response = await fetch('/api/images', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch images');

        setImages(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete image');

      setImages(images.filter(img => img.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
    }
  };

  return (
    <main className="flex-1 bg-[#131515] p-4 overflow-auto">
      <div className="h-full w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading images...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">{error}</div>
        ) : images.length === 0 ? (
          <div className="flex items-center justify-center h-full">No images found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
            {images.map((img) => (
              <ImageComponent
                key={img.id}
                id={img.id}
                title={img.title}
                description={img.description}
                imageUrl={img.imgLink}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}