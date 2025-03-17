
const API_URL = "http://localhost:8080/api/auth";

const authRepository = {
    login: async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Échec de l'authentification");
        }

        return response.json();
    },

    async register(data: any, profilePicture: File | null) {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de l'inscription");
        }

        return response.json();
    },
};



export default authRepository;