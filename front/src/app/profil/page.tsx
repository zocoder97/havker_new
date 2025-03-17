"use client";
import { useEffect, useState } from "react";
import { fetchUserById, updateUser, updateVisibility } from "@/repositories/userRepository";
import { getUserId, logoutUser } from "@/utils/auth";
import { Eye, EyeOff, Edit, Save, LogOut } from "lucide-react";

export default function Profil() {
    const [user, setUser] = useState<{
        id: number;
        username: string;
        email: string;
        age: number;
        description?: string;
        profilPicture?: string;
        isVisible: boolean;
    } | null>(null);

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ username: "", email: "", age: 0, description: "" });

    useEffect(() => {
        const loadUser = async () => {
            const userId = getUserId();
            if (!userId) return;
            try {
                const userData = await fetchUserById(userId);
                setUser(userData);
                setFormData({
                    username: userData.username,
                    email: userData.email,
                    age: userData.age,
                    description: userData.description || "",
                });
            } catch (error) {
                console.error("Erreur lors du chargement de l'utilisateur:", error);
            }
        };
        loadUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!user) return;
        try {
            await updateUser(user.id, formData);
            setUser({ ...user, ...formData });
            setEditing(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }
    };

    const toggleVisibility = async () => {
        if (!user) return;
        try {
            await updateVisibility(user.id, !user.isVisible);
            setUser({ ...user, isVisible: !user.isVisible });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la visibilité:", error);
        }
    };

    if (!user) return <p className="text-center text-gray-500 mt-10">Chargement...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col items-center space-y-4">
                <img
                    src={`http://localhost:8080${user.profilPicture}`}
                    alt="Photo de profil"
                    className="w-32 h-32 rounded-full border border-gray-300"
                />
                
                <div className="text-center space-y-2 w-full">
                    {editing ? (
                        <div className="space-y-2">
                            <input 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="number" 
                                name="age" 
                                value={formData.age} 
                                onChange={handleChange} 
                                className="border p-2 rounded w-full"
                            />
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                className="border p-2 rounded w-full"
                                rows={3}
                            />
                            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
                                <Save size={18} className="mr-2" /> Enregistrer
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold">{user.username}</h2>
                            <p className="text-gray-500">{user.email}</p>
                            <p className="text-gray-600">Âge: {user.age} ans</p>
                            {user.description && <p className="italic text-gray-500">"{user.description}"</p>}
                        </>
                    )}
                </div>

                <div className="flex space-x-4">
                    <button onClick={() => setEditing(!editing)} className="bg-blue-500 text-white p-2 rounded-full">
                        <Edit size={20} />
                    </button>

                    <button onClick={toggleVisibility} className="bg-gray-200 p-2 rounded-full">
                        {user.isVisible ? <Eye size={20} className="text-green-500" /> : <EyeOff size={20} className="text-red-500" />}
                    </button>

                    <button onClick={logoutUser} className="bg-red-500 text-white p-2 rounded-full">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
