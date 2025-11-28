import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ArticlesPage.css';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3001/articles/';

const ArticlesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetch(`${API_URL}${id}`)
            .then((response) => {
                if (!response.ok) throw new Error("Article introuvable ou erreur serveur");
                return response.json();
            })
            .then((data) => {
                data.createdAt = new Date(data.createdAt);
                setArticle(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [id]);

    const deleteArticle = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            fetch(`${API_URL}${id}`, { method: 'DELETE' })
                .then((response) => {
                    if (!response.ok) throw new Error("Erreur lors de la suppression");
                    navigate("/");
                    toast.success("Article supprimé avec succès !");
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Erreur : " + err.message);
                });
        }
    };

    if (isLoading) return <div className="loading-state">Chargement de l'article...</div>;
    if (error) return <div className="error-state">Erreur : {error}</div>;
    if (!article) return <div className="error-state">Aucun article trouvé.</div>;

    const dateLabel = article.isEdited ? "Dernière mise à jour le" : "Publié le";

    return (
        <main id="main-content" tabIndex={-1}>
            <article className="article-detail-page" itemScope itemType="https://schema.org/Article">

                <nav aria-label="Fil d'Ariane">
                    <Link to="/" className="back-link">
                        ← Retour à l'accueil
                    </Link>
                </nav>

                <header>
                    <h1 className="article-title" itemProp="headline">
                        {article.title}
                    </h1>

                    <div className="article-meta">
                        <span className="category-tag" itemProp="articleSection">
                            {article.categoryName}
                        </span>

                        <span aria-label={`Nombre de mentions j'aime : ${article.likeCount}`}>
                            {article.likeCount} J'aime
                        </span>

                        <span>
                            {dateLabel}{" "}
                            <time
                                dateTime={article.createdAt.toISOString()}
                                itemProp="datePublished"
                            >
                                {article.createdAt.toLocaleDateString()}
                            </time>
                        </span>
                    </div>
                </header>

                <figure>
                    <img
                        src={article.image.includes('picsum.photos')
                            ? article.image.replace(/(\d+)\/(\d+)(\?.*)?$/, '$1/$2.webp')
                            : article.image}
                        alt={`Illustration de l'article : ${article.title}`}
                        className="article-image"
                        loading="lazy"
                        width={800}
                        height={600}
                        itemProp="image"
                    />
                    <figcaption className="visually-hidden">
                        Image illustrant l’article "{article.title}"
                    </figcaption>
                </figure>


                <section className="article-content" itemProp="articleBody">
                    <p>{article.content}</p>
                </section>

                <div className='action-buttons'>
                    <button
                        onClick={() => navigate(`/articles/${id}/edit`)}
                        className='updateButton'
                        aria-label="Modifier l'article"
                    >
                        Modifier
                    </button>

                    <button
                        onClick={deleteArticle}
                        className='deleteButton'
                        aria-label="Supprimer l'article"
                    >
                        Supprimer
                    </button>
                </div>

            </article>
        </main>
    );
};

export default ArticlesPage;
