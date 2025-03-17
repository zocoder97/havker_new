import { Story } from "@/types/story";
import { getToken, getUserId } from "@/utils/auth";

const API_URL_STORY = "http://localhost:8080/api/story";

const userId = getUserId();

export const getTopStories = async (): Promise<Story[]> => {
  const response = await fetch(`${API_URL_STORY}/top_stories`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des stories");
  }
  return response.json();
};

export const getFavorites = async () => {
  if (!userId) {
    return[];    
  }
  const response = await fetch(`${API_URL_STORY}/favorites/${userId}`);
  if (!response.ok) throw new Error("Erreur récupération des favoris");
  const data = await response.json();
  //console.log(data.stories) 
  return data.stories ? data.stories.map((story: Story) => story) : [];
};

export const getFavoritesIUser = async (user:number) => {
  const response = await fetch(`${API_URL_STORY}/favorites/${user}`);
  if (!response.ok) throw new Error("Erreur récupération des favoris");
  const data = await response.json();
  return data.stories ? data.stories.map((story: Story) => story.id) : [];
};

export const addFavorite = async (storyId: number) => {
  await fetch(`${API_URL_STORY}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ userId, storyId }),
  });
};

export const removeFavorite = async (storyId: number) => {
  await fetch(`${API_URL_STORY}/favorites/${storyId}`, {
     method: "DELETE" ,
     headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    });
};

export default { getTopStories };
