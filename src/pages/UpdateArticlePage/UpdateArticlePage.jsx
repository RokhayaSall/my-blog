import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UpdateArticlePage.css';

const UpdateArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState({
        title: "",
        content: "",
        image: "",
        categoryName: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/articles/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Article introuvable");
                }
                return res.json();
            })
            .then((data) => {
                setArticle(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Impossible de charger l'article");
                navigate("/");
            });
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);


        const articleToUpdate = {
            ...article,
            createdAt: new Date().toISOString(),
            isEdited: true
        };

        fetch(`http://localhost:3001/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleToUpdate)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erreur HTTP : ${res.status}`);
                }
                return res.json();
            })
            .then(() => {
                toast.success("Article modifié avec succès !");
                setTimeout(() => {
                    navigate(`/articles/${id}`);
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Erreur lors de la modification : " + err.message);
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    if (isLoading) return <div className="loading-container">Chargement des données...</div>;

    return (
        <div className="update-article-page">
            <h1>Modifier l'article</h1>

            <form onSubmit={handleSubmit} className="update-article-form">

                <label className="form-label" htmlFor="title"></label>
                <input
                    id='title'
                    type="text"
                    value={article.title}
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                    className="form-input"
                    required
                />

                <label className="form-label" htmlFor="categorie"></label>
                <input
                    id='categorie'
                    type="text"
                    value={article.categoryName}
                    onChange={(e) => setArticle({ ...article, categoryName: e.target.value })}
                    className="form-input"
                    required
                />

                <label className="form-label" htmlFor="url"></label>
                <input
                    id='url'
                    type="url"
                    value={article.image}
                    onChange={(e) => setArticle({ ...article, image: e.target.value })}
                    className="form-input"
                    required
                />


                <label className="form-label" htmlFor="content"></label>
                <textarea
                    id='content'
                    value={article.content}
                    onChange={(e) => setArticle({ ...article, content: e.target.value })}
                    rows="10"
                    className="form-textarea"
                    required
                />

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSaving}
                >
                    {isSaving ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
                </button>
            </form>
        </div>
    );
};

export default UpdateArticlePage;