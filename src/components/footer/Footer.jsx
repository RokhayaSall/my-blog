import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-section">
                    <h3>Mon Blog</h3>
                    <p>
                        Partage de connaissances sur la tech, le développement web et la nature.
                        Apprenons ensemble à construire le web de demain.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Liens rapides</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Suivez-moi</h3>
                    <div className="social-icons">

                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <img src="/icons/instagram.svg" alt="" className="social-icon" loading="lazy" />
                        </a>

                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <img src="/icons/facebook.svg" alt="" className="social-icon" loading="lazy" />
                        </a>

                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="Tiktok">
                            <img src="/icons/tiktok.svg" alt="" className="social-icon" loading="lazy" />
                        </a>

                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} Mon Blog. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
