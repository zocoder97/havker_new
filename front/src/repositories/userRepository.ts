import { User } from "@/types/user";
import { getToken } from "@/utils/auth";
const API_URL_USER = "http://localhost:8080/api";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL_USER}/users`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }
  return response.json();
};

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_URL_USER}/user/${userId}`);
  if (!response.ok) {
    throw new Error("Utilisateur non trouvé");
  }
  return response.json();
};

export const updateUser = async (userId: number, userData: Partial<User>): Promise<void> => {
  //console.log(userId);
  //console.log(userData);
  //console.log(getToken());
  const response = await fetch(`${API_URL_USER}/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }
};


export const updateVisibility = async (userId: number, isVisible: boolean): Promise<void> => {
  const response = await fetch(`${API_URL_USER}/update_is_visible/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ isVisible }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour de la visibilité");
  }
};


export default { getUsers, fetchUserById, updateUser, updateVisibility };
