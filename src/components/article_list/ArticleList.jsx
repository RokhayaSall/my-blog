import { useState, useEffect } from 'react';
import ArticleThumbnail from '../article_thumbnail/ArticleThumbnail';
import './ArticleList.css';
import { FiSearch } from 'react-icons/fi';

const API_URL = 'http://localhost:3001/articles';

const ArticleList = ({ title = "Articles Populaires" }) => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! Statut: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const processedData = data.map(article => ({
                    ...article,
                    createdAt: new Date(article.createdAt)
                }));
                setArticles(processedData);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors du fetch des articles:", err);
                setError("Impossible de charger les données. Vérifiez que json-server est lancé (npm run api).");
                setIsLoading(false);
            });

    }, []);

    const filteredArticles = articles.filter(article => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        return (
            article.title.toLowerCase().includes(lowerCaseSearch) ||
            article.content.toLowerCase().includes(lowerCaseSearch)
        );
    });

    if (isLoading) {
        return (
            <section className="article-list-section">
                <h2 className="article-list-title">{title}</h2>
                <p aria-live="polite">Chargement des articles en cours...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="article-list-section">
                <h2 className="article-list-title">{title}</h2>
                <p className="error-message" role="alert">{error}</p>
            </section>
        );
    }

    if (articles.length === 0 && !searchTerm) {
        return (
            <section className="article-list-section">
                <h2 className="article-list-title">{title}</h2>
                <p>Aucun article n'a été trouvé dans l'API.</p>
            </section>
        );
    }

    return (
        <section className="article-list-section">
            <h2 className="article-list-title">{title}</h2>

            <div className="search-container">

                <input
                    id="article-search"
                    type="text"
                    placeholder="Filtrer par titre ou contenu..."
                    className="article-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                    type="button"
                    className="search-button"
                    aria-label="Rechercher"
                >
                    <FiSearch aria-hidden="true" />
                </button>
            </div>

            <div className="articles-grid" role="list">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <ArticleThumbnail
                            key={article.id}
                            id={article.id}
                            title={article.title}
                            content={article.content}
                            image={article.image}
                            createdAt={article.createdAt}
                            likeCount={article.likeCount}
                            categoryName={article.categoryName}
                        />
                    ))
                ) : (
                    <p className="no-results-message" aria-live="polite">
                        Aucun article ne correspond à votre recherche "{searchTerm}".
                    </p>
                )}
            </div>
        </section>
    );
};

export default ArticleList;
