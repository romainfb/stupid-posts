"use client";

import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://45.155.171.156:8008/posts");

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Idées de Merde</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Une collection des idées les plus absurdes et inutiles du web.
          </p>
        </header>

        <main>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex space-x-2">
                <div className="h-3 w-3 bg-foreground/70 rounded-full"></div>
                <div className="h-3 w-3 bg-foreground/70 rounded-full"></div>
                <div className="h-3 w-3 bg-foreground/70 rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800/30 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-full text-sm transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/70">Aucune idée trouvée.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white dark:bg-black/20 border border-black/[.08] dark:border-white/[.08] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                  <p className="text-foreground/70 mb-4">{post.content}</p>
                  <div className="text-xs text-foreground/50">
                    {new Date(post.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <footer className="mt-16 pt-8 border-t border-black/[.08] dark:border-white/[.08] text-center text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} Idées de Merde - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}
