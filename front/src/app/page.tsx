"use client";
import { useState, useEffect } from "react";
import { getTopStories, getFavorites, addFavorite, removeFavorite } from "@/repositories/storyRepository";
import { Story } from "@/types/story";

export default function Home() {
    const [stories, setStories] = useState<Story[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const [storiesData, favoritesData] = await Promise.all([
                    getTopStories(),
                    getFavorites(),
                ]);
                setStories(storiesData);
                setFavorites(favoritesData);
            } catch (error) {
                console.error("Erreur chargement:", error);
            }
        }
        fetchData();
    }, []);

    const toggleFavorite = async (storyId: number) => {
        try {
            if (favorites.includes(storyId)) {
                await removeFavorite(storyId);
                setFavorites(favorites.filter((id) => id !== storyId));
            } else {
                await addFavorite(storyId);
                setFavorites([...favorites, storyId]);
            }
        } catch (error) {
            console.error("Erreur modification favori:", error);
        }
    };

    
    const filteredStories = stories.filter((story) =>
        story.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Nos Stories</h1>
            <div className="max-w-4xl mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Rechercher une histoire..."
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                    <div key={story.id} className="bg-white p-4 rounded-lg shadow-md relative">
                        <button
                            className="absolute top-2 right-2 text-2xl"
                            onClick={() => toggleFavorite(story.id)}
                        >
                            <span title="Ajout comme favori">{favorites.includes(story.id) ? "❤️" : "🤍"}</span>
                        </button>

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
        </div>
    );
}
