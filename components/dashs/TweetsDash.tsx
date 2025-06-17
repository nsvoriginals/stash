import { useEffect, useState } from 'react';
import TweetsComponent from "../TweetsComponent";

interface Tweet {
  id: string;
  title: string;
  description?: string;
  tweetId: string;
}

export default function TweetsDash() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        const response = await fetch('/api/tweets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch tweets');

        setTweets(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`/api/tweets/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete tweet');

      setTweets(tweets.filter(tweet => tweet.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tweet');
    }
  };

  return (
    <main className="flex-1 bg-[#131515] p-4 overflow-auto">
      <div className="h-full w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading tweets...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">{error}</div>
        ) : tweets.length === 0 ? (
          <div className="flex items-center justify-center h-full">No tweets found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10">
            {tweets.map((tweet) => (
              <TweetsComponent
                key={tweet.id}
                id={tweet.id}
                tweetId={tweet.tweetId}
                description={tweet.description}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}