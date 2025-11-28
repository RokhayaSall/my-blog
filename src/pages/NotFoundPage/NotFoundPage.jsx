import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Oups ! Page non trouvée.</h2>
            <p className="not-found-text">La page que vous cherchez n'existe pas ou a été déplacée.</p>
            
            <Link to="/" className="not-found-link">
                Retourner à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;