import React, {useContext, useState} from 'react' // bruges til logud
import { NavLink, Link } from 'react-router-dom'
import { FaLock } from "react-icons/fa";

//** STYLE */
import './adminNavbar.css'

//** LOG UD */
import {LoginContext} from '../../context/LoginContext' // bruges til logud

//*** ICONS */
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

//** LOGO */
import NavLogo from "../../assets/images/logo.png";

const AdminNavbar = () => {

 // State til at håndtere om menuen skal vises/skjules på MOBILE!

 const [click, setClick] = useState(false);
 const [button, setButton] = useState(true);

 const handleClick = () => setClick(!click);
 const closeMobileMenu = () => setClick(false);


  const {signout} = useContext(LoginContext); // bruges til logud

  return (

    <>
    <nav className="navbar-admin">
      <div className="navbar-container-admin">

      <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={NavLogo} style={{width: '150px'}} alt="Logo i navbar" title=" FTA Logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes color="#fff" /> : <FaBars color="#fff" />}
          </div>

          <ul className={click ? "nav-menu-admin active" : "nav-menu-admin"}>
            <li className="nav-item-admin">
              <li><NavLink to='/' className="nav-links-admin" onClick={closeMobileMenu}>HOME</NavLink></li>
            </li>
            <li className="nav-item-admin">
              <li><NavLink to='/admin' className="nav-links-admin" onClick={closeMobileMenu}>Admin</NavLink></li>
            </li>
            <li className="nav-item-admin">
              <li><NavLink to='adminabout' className="nav-links-admin" onClick={closeMobileMenu}>Ret About</NavLink></li>
            </li>
            <li className="nav-item-admin">
              <li><NavLink to='admincontact' className="nav-links-admin" onClick={closeMobileMenu}>Slet en kontakt besked</NavLink></li>
            </li>
            <li className="nav-item-admin">
              <li><NavLink to='admintours' className="nav-links-admin" onClick={closeMobileMenu}>Ret eller Slet rejsemål</NavLink></li>
            </li>
            <li className="nav-item-admin">
              <li><NavLink to='admintoursopret' className="nav-links-admin" onClick={closeMobileMenu}>Opret nyt rejsemål</NavLink></li>
            </li>
            {/* Kald signout (fra contextprovider) for at slette brugeren i den 'globale state */}
              
          </ul>
         <button className='button-lock'onClick={signout}><FaLock title="log ud"/></button>
      </div>
    </nav>
    </>
  )
}

export default AdminNavbar;