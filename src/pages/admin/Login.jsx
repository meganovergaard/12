import React, {useContext} from 'react' 
// hver gang jeg skal have fat i indholdet fra 
//contextprovider skal jeg have fat i useContext da det er en 'context forbinder'

import { Navigate } from "react-router-dom";

// ICON
import { FaArrowDown } from "react-icons/fa";

// LOGO
import LogoLille from '../../assets/images/logo.png'
import LogoStor from '../../assets/images/hero.png'

// Hent fra context provider
import { LoginContext} from '../../context/LoginContext'

//** STYLE */
import './login.scss'

const Login = () => {

    const { signin, user, signout } = useContext(LoginContext); // henter fra context-provider

    const handleLogin = (e) => {
      e.preventDefault(); // stop (re)loading af siden

      //console.log(e.target.brugernavn.value)
    //console.log(e.target.password.value)

    const brugernavn = e.target.brugernavn.value;
    const password = e.target.password.value;

    //** signin skal have to indput, brugernavn og password -- vigtigt at dette er i denne rækkefølge */
    signin(brugernavn, password);
  };


  return (
    <section className="login-container">
      

      <div className="logo-small"><img src={LogoLille} alt="lille logo" /></div>
      <h1 className='events'>Events</h1>
      <div className="logo-big"><img src={LogoStor} alt="lille logo" /></div>
      <h1 className='travels'>Travels</h1>
      <FaArrowDown className='arrow-icon bounce'/>

      
      {/* Hvis man ikke er logget ind */}
      {/* user er den globale state */}
      {!user && 
      
      (

        <form className='login-form' onSubmit={handleLogin}>{/*  onSubmit spørg om der er submittet nede fra knappen */}
         
          <label>
            {" "}
            <input type="text" name="brugernavn" required placeholder="Brugernavn"/>
          </label>

          <br></br>

          <label >
            {" "}
            <input  type="password" name="password" required placeholder="Password"/>
          </label>
          
          
          
          <button id='login-button' type="submit">LOGIN</button>
          
          
        </form>
      )
      }

      {/* Hvis man er logget ind */}
      {user && <Navigate to="/admin" replace />}

      
    </section>
  )
}

export default Login
