"use client";
import { useEffect, useState } from "react";
import { getUsers } from "@/repositories/userRepository";
import { User } from "@/types/user";
import { useRouter } from "next/navigation"; 
import styles from "./users.module.css";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Chargement...</p>;

  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className={styles.title}>Liste des utilisateurs</h1>

      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => router.push(`/users/${user.id}`)}
              className="cursor-pointer border p-4 rounded-lg shadow-md text-center hover:bg-gray-100 transition"
            >
              {user.profilPicture ? (
                <img
                  src={`http://localhost:8080${user.profilPicture}`}
                  alt={user.username}
                  className="w-24 h-24 rounded-full mx-auto"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"></div>
              )}
              <h3 className="text-lg font-bold mt-2">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Aucun utilisateur trouvé</p>
        )}
      </div>
    </div>
  );
}
