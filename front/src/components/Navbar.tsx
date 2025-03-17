"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { getUserId, getToken } from "@/utils/auth";
import { fetchUserById } from "@/repositories/userRepository";

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState<{ profilPicture?: string } | null>(null);


    const loadUser = useCallback(async () => {
        const userId = getUserId();
        if (!userId) return;

        try {
            const userData = await fetchUserById(userId);
            setUser(userData);
        } catch (error) {
            console.error("Erreur lors du chargement de l'utilisateur:", error);
        }
    }, []);

    useEffect(() => {
        if (getToken()) {
            loadUser();
        }
    }, [loadUser]);

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-50 h-16">
            <div className="container mx-auto flex justify-between items-center h-full px-4">
                <h1 className="text-xl text-green-600 font-bold">HackerNews</h1>


                <div className="hidden lg:flex space-x-6 list-none">
                    <NavLink href="/" active={pathname === "/"}>Accueil</NavLink>
                    {user && <NavLink href="/favorites" active={pathname === "/favorites"}>Favoris</NavLink>}
                    <NavLink href="/users" active={pathname === "/users"}>Utilisateurs</NavLink>

                    {user ? (
                        <NavLink href="/profil" active={pathname === "/profil"}>
                            <img
                                src={`http://localhost:8080${user.profilPicture}`}
                                alt="Profil"
                                className="w-10 h-10 rounded-full border border-gray-300"
                            />
                        </NavLink>
                    ) : (
                        <NavLink href="/login" active={pathname === "/login"}>Se connecter</NavLink>
                    )}
                </div>

                {/* Menu Burger - Mobile */}
                <button
                    className="lg:hidden text-green-600 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Navigation Mobile */}
            <ul className={`lg:hidden bg-gray-100 absolute w-full left-0 top-16 list-none transition-all duration-300 p-4 
                ${menuOpen ? "block" : "hidden"}`}>
                <NavLink href="/" active={pathname === "/"}>Accueil</NavLink>
                {user && <NavLink href="/favorites" active={pathname === "/favorites"}>Favoris</NavLink>}
                <NavLink href="/users" active={pathname === "/users"}>Utilisateurs</NavLink>

                {user ? (
                    <NavLink href="/profil" active={pathname === "/profil"}>
                        <img
                            src={`http://localhost:8080${user.profilPicture}`}
                            alt="Profil"
                            className="w-10 h-10 rounded-full border border-gray-300"
                        />
                    </NavLink>
                ) : (
                    <NavLink href="/login" active={pathname === "/login"}>Se connecter</NavLink>
                )}
            </ul>
        </nav>
    );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <li className="py-2 lg:py-0">
            <Link
                href={href}
                className={`px-4 py-2 text-lg rounded-md transition block lg:inline-block
                    ${active ? "text-green-600 underline" : "hover:text-green-600"}`}
            >
                {children}
            </Link>
        </li>
    );
}
