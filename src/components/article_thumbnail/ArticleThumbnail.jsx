import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './articleThumbnail.css';
import { FcLike } from 'react-icons/fc';
import { IoIosHeartEmpty } from 'react-icons/io';


const FALLBACK_IMAGE = 'https://monjardinmamaison.maison-travaux.fr/wp-content/uploads/sites/8/2024/10/oiseau-geai-bleu-a-observer-au-jardin-en-automne-octobre-bon-presage.jpg';

const ArticleThumbnail = ({
    id,
    title,
    content,
    image,
    createdAt,
    likeCount,
    categoryName
}) => {

    const [isLiked, setIsLiked] = useState(false);
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
    const [imgSrc, setImgSrc] = useState(image || FALLBACK_IMAGE);

    const handleLikeClick = (e) => {
        e.preventDefault(); 
        setIsLiked(prev => !prev);
        setCurrentLikeCount(prev => prev + (isLiked ? -1 : 1));
    };

    const formattedDate = new Date(createdAt).toLocaleDateString('fr-FR');
    const excerpt = content ? content.substring(0, 100) + '...' : 'Lire la suite...';
    const LikeIcon = isLiked ? FcLike : IoIosHeartEmpty;

    return (
        <Link to={`/articles/${id}`} className="article-thumbnail-link">
            <div className="article-thumbnail">
                
                <img
                    src={imgSrc} 
                    alt={title}
                    className="thumbnail-image"
                    loading="lazy"
                    width="400"
                    height="300"
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                />

                <div className="thumbnail-content">
                    <p className="thumbnail-date">{formattedDate} - Catégorie: {categoryName}</p>
                    <h2 className="thumbnail-title">{title}</h2>
                    <p className="thumbnail-excerpt">{excerpt}</p>

                    <p
                        className="thumbnail-likes interactive"
                        onClick={handleLikeClick}
                        role="button"
                        aria-label={isLiked ? "Je n'aime plus" : "J'aime cet article"}
                    >
                        <LikeIcon /> {currentLikeCount} J'aime
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ArticleThumbnail;