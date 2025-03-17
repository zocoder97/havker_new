import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    userId: number;
    username: string;
}

export const getUserId = (): number | null => {
    const token = getToken();
    if (!token) return null;

    try {
        //console.log(token);

        const decoded = jwtDecode<TokenPayload>(token);
        //console.log(decoded)
        return decoded.userId;
    } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        return null;
    }
};


export const isAuthenticated = (): boolean => {
    if (typeof window !== "undefined") {
        return !!localStorage.getItem("token");
    }
    return false;
};

export const getToken = (): string | null => {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

export const loginUser = (token: string) => {
    localStorage.setItem("token", token);
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};
