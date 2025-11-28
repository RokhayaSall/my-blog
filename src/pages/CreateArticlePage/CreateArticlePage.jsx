import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './createArticlePage.css';

const CreateArticlePage = () => {
    const navigate = useNavigate();

    const [newArticle, setNewArticle] = useState({
        title: "",
        content: "",
        image: "",
        categoryName: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);


        const imageFinal = newArticle.image.trim() !== ""
            ? newArticle.image
            : "https://picsum.photos/800/600?random=" + Math.random();

        const articleToSend = {
            ...newArticle,
            image: imageFinal,
            createdAt: new Date().toISOString(),
            likeCount: 0
        };

        fetch("http://localhost:3001/articles", {
            method: "POST",
            body: JSON.stringify(articleToSend),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erreur serveur lors de la création");
                }
                return res.json();
            })
            .then((data) => {
                toast.success("Article créé avec succès !");
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Une erreur est survenue : " + err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="create-article-page">
            <h1>Créer un nouvel article</h1>

            <form onSubmit={handleSubmit} className="create-article-form">

                <label htmlFor="titre"></label>
                <input
                    id='titre'
                    type="text"
                    placeholder="Titre de l'article"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="form-input"
                    required
                    disabled={isLoading}
                />

                <label htmlFor="categorie"></label>
                <input
                    id='categorie'
                    type="text"
                    placeholder="Categorie de l'article"
                    value={newArticle.categoryName}
                    onChange={(e) => setNewArticle({ ...newArticle, categoryName: e.target.value })}
                    className="form-input"
                    required
                    disabled={isLoading}
                />

                <label htmlFor="url"></label>
                <input
                    id='url'
                    type="url"
                    placeholder="URL de l'image"
                    value={newArticle.image}
                    onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                    className="form-input"
                    disabled={isLoading}
                    required
                />


                <label htmlFor="contenu"></label>
                <textarea
                    id='contenu'
                    placeholder="Contenu de l'article"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    rows="10"
                    className="form-textarea"
                    required
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="submit-button"
                >
                    {isLoading ? "Envoi en cours..." : "Publier l'article"}
                </button>
            </form>
        </div>
    );
};

export default CreateArticlePage;


