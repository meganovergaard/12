import React, { useState } from "react";
import { NavLink, Link} from "react-router-dom";
import { FaSistrix, FaLock } from "react-icons/fa";

//*** ICONS */
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

//Style
import "./navbar.css";

//** LOGO */
import NavLogo from "../assets/images/logo.png";

//** LOGIN CONTEXT */
import { LoginContext } from "../context/LoginContext";

const Navbar = () => {
  /* // bruges at kunne huskes globalt - ændre menuen når man er logget ind
  const {user, signout} = useContext(LoginContext); // er jeg logget ind eller er jeg ikke logget ind -> hvilken knap skal jeg vise
   */
  // State til at håndtere om menuen skal vises/skjules på MOBILE!

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={NavLogo} style={{width: '150px'}} alt="Logo i navbar" title=" FTA Logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes color="#fff" /> : <FaBars color="#fff" />}
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <a href="#about" className="nav-links" onClick={closeMobileMenu}>
                Om os
              </a>
            </li>
            <li className="nav-item">
              <a href="#tours" className="nav-links" onClick={closeMobileMenu}>
              Rejsemål
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-links" onClick={closeMobileMenu}>
                Kontakt
              </a>
            </li>
            <li>
                <NavLink to="/admin" className="nav-links" onClick={closeMobileMenu}><FaLock title="log ind"/></NavLink>
              </li>
            
            </ul>

          
            <div className="search-icon">
            <FaSistrix title="søg"/>
            </div>
            
            <Link to="search">
              <div className="search-navbar">
              <input type="text" placeholder="Search" />
              <br></br>
              <button >Search</button>
              </div>
            </Link>
            
            
        </div>
      </nav>
    </>
  );
};

export default Navbar;
