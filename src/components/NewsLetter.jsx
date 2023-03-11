import { useState } from "react";

//**** STYLE */
import './newsletter.scss';

//*** API KALD */ POST METODE
import {newSubscription} from '../helpers/apikald'

const NewsLetter = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault(); // for at undgå at siden reloader ved 'submit

        // DET ER HER JEG LAVER SIGNUP SOM BLIVER SENDT IND TIL DATABASEN

    const signup = new FormData(e.target); // apiet vil gerne have formdata
    setLoading(true);

    newSubscription(signup).then((response) => {
      if (response) {
        console.log(response.message);
        setMessage(response.message);
        setError()
        //Tøm formular
        e.target.reset();

      } else {
        //HVis fejl, send en besked
        setError(true)
        setMessage()

        console.log("FEJL");
      }

      setLoading(false);
    });
  };

  return (
    <section className="newsletter-container">
    <h1 className="newsletter-heading">Skriv dig op til vores nyhedsbrev</h1>
    <p className="newsletter-teaser">Skriv dig op til vores nyhedsbrev og modtag de dejligste rejsemål. Vi lover dig at du ikke vil fortryde det.</p>
    <form onSubmit={handleSubmit}>
            {/*  Her håndtere vi en metode */}
            <label>
              <input type="text" name="name" required placeholder="Navn*" />
            </label> 
            <label>
              <input
                type="email"
                name="email"
                required
                placeholder="Email adresse*"
              />
            </label>
            
            <button className='button-submit' type="submit">Send</button>
          </form>
       

         {/* Hvis der er en bedsked.. sender den en h2 besked*/}
         {
            message && <p className='thankyou-message'>Tak for din tilmelding, vi ser frem til at sende dig spændende nyheder.</p>
          }

        {loading && <h1>Loading ...</h1>}

        {error && <h1>Der er opstået en fejl...</h1>}
    </section>
  )
}

export default NewsLetter
