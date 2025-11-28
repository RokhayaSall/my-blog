import React, { useState } from 'react'; 
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; 
import "./Header.css";
import logo from "../../assets/react.svg";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Mon Blog</h1>
      </div>


      <div className="burger-icon" aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"} onClick={toggleMenu}>
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </div>


      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={closeMenu}>Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/articles/new" onClick={closeMenu}>+Article</NavLink>
          </li>
          
          <li>
            <button className="connect-button" onClick={closeMenu}>
              Me connecter
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;