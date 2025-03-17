"use client";
import { useEffect, useState } from "react";
import { getFavorites } from "@/repositories/storyRepository";
import { Story } from "@/types/story";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteStoryIds = await getFavorites();/* 
        console.log(favoriteStoryIds);
        const stories = favoriteStoryIds.map((id: number) => ({
          id,
          title: `Histoire ${id}`,
          url: `https://news.ycombinator.com/item?id=${id}`,
        })); */
        setFavorites(favoriteStoryIds);
      } catch (err) {
        setError("Impossible de récupérer les favoris.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Mes Favoris</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">Aucune histoire favorite.</p>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((story) => (
            <div key={story.id} className="bg-white p-4 rounded-lg shadow-md relative">
              <h2 className="text-lg font-semibold text-gray-800">
                <a href={story.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {story.title}
                </a>
              </h2>
              <p className="text-sm text-gray-600">By {story.by}</p>
              <p className="text-xs text-gray-500">{story.score} points | {story.descendants} comments</p>
            </div>
          ))}
        </div>

      )}
    </div>
  );
}
