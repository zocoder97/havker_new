"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import authRepository from "@/repositories/authRepository";
import { loginUser } from "@/utils/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        age: "",
        description: "",
    });

    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.username.trim()) newErrors.username = "Le nom est requis.";
        else if (formData.username.length < 3) newErrors.username = "Le nom doit contenir au moins 3 caractères.";

        if (!formData.email.trim()) newErrors.email = "L'email est requis.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide.";

        if (!formData.password) newErrors.password = "Le mot de passe est requis.";
        else if (formData.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";

        if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 13)) {
            newErrors.age = "L'âge doit être un nombre valide (min 13 ans).";
        }

        if (formData.description.length > 500) {
            newErrors.description = "La description ne doit pas dépasser 500 caractères.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError("");

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await authRepository.register(formData, profilePicture);

            if (response.token) {
                loginUser(response.token);
                setTimeout(()=>{
                    router.refresh();
                },2000);
                router.push("/");
            }
        } catch (error: any) {
            setServerError(error.message || "Erreur lors de l'inscription.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className={styles.title}>Créer un compte</h2>

                {serverError && <p className={styles.serverError}>{serverError}</p>}

                <div className={styles.isFormGroupFlex}>
                    <div className={styles.formGroup}>
                        <label>Nom</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} className={styles.input} />
                        {errors.username && <p className={styles.error}>{errors.username}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>
                </div>

                <div className={styles.isFormGroupFlex}>
                    <div className={styles.formGroup}>
                        <label>Mot de passe</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Âge (optionnel)</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} className={styles.input} />
                        {errors.age && <p className={styles.error}>{errors.age}</p>}
                    </div>
                </div>
                
                <div className={styles.formGroup}>
                    <label>Description (optionnelle)</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className={styles.input} />
                    {errors.description && <p className={styles.error}>{errors.description}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Photo de profil (optionnelle)</label>
                    <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} className={styles.input} />
                </div>

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Chargement..." : "S'inscrire"}
                </button>

                <p className={styles.loginRedirect}>
                    Vous avez déjà un compte ? <a href="/login">Se connecter</a>
                </p>
            </form>
        </div>
    );
}

