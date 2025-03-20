"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserById, } from "@/repositories/userRepository";
import { User } from "@/types/user";
import { Story } from "@/types/story";
import { getFavoritesIUser } from "@/repositories/storyRepository";

export default function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [favorites, setFavorites] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const getUserData = async () => {
            try {
                const userData = await fetchUserById(Number(userId));
                setUser(userData);

                const userFavorites = await getFavoritesIUser(Number(userId));
                setFavorites(userFavorites);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [userId]);

    if (loading) return <p className="text-center text-gray-500 mt-10">Chargement...</p>;
    if (!user) return <p className="text-center text-red-500 mt-10">Utilisateur non trouvé.</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white  rounded-lg">
            <div className="flex flex-col items-center space-y-4 shadow-lg">
                {user.profilPicture ? (
                    <img
                        src={`http://localhost:8080${user.profilPicture}`}
                        alt="Photo de profil"
                        className="w-32 h-32 rounded-full border border-gray-300"
                    />
                ) : (
                    <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
                )}

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">{user.username}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-gray-600">Âge: {user.age} ans</p>
                    {user.description && <p className="italic text-gray-500">"{user.description}"</p>}
                </div>
            </div>

            <div className="mb-6" style={{ marginTop: "1rem" }}>
                <h3 className="text-xl font-semibold mb-2">Favoris de {user.username}</h3>
                {favorites.length > 0 ? (
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
                ) : (
                    <p className="text-gray-500">Aucun favori pour cet utilisateur.</p>
                )}
            </div>
        </div>
    );
}
