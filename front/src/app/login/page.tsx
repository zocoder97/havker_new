"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import authRepository from "@/repositories/authRepository";
import { loginUser } from "@/utils/auth";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "", general: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation simple
        let newErrors = { email: "", password: "", general: "" };
        if (!formData.email) newErrors.email = "L'email est requis.";
        if (!formData.password) newErrors.password = "Le mot de passe est requis.";
        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await authRepository.login(formData.email, formData.password);
            loginUser(response.token);
            router.push("/");
        } catch (error) {
            setErrors({ ...errors, general: "Échec de la connexion. Vérifiez vos identifiants." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Connexion</h2>

                {errors.general && <p className={styles.error}>{errors.general}</p>}

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Votre email"
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Votre mot de passe"
                    />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                </div>

                <div className={styles.formButton}>
                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? "Connexion..." : "Connexion"}
                    </button>
                    <p>Vous n'avez pas de compte ? <a className={styles.link} href="/register">S'inscrire</a></p>
                </div>
            </form>
        </div>
    );
}