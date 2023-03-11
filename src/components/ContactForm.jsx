import { useState } from "react";

//**** STYLE */
import './contact.scss';
import './contactForm.scss';

//*** API KALD */ POST METODE
import {newContact} from '../helpers/apikald'


const Contact = () => {

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault(); // for at undgå at siden reloader ved 'submit
    // send/post spørgsmål til API
    //console.log(e.target)

    // Her laves formen som bliver sendt ind til databasen

    const contactMessage = new FormData(e.target); // apiet vil gerne have formdata
    setLoading(true);

    newContact(contactMessage).then((response) => {
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
    <section className="contactform-container">

        <h2 className='contactform-heading'>Skriv til os</h2>
          
          
          <form onSubmit={handleSubmit}>
            {/*  Her håndtere vi en metode submitter knappen*/}
            
            
            <label>  
              <br />
              <input type="text" name="name" required placeholder="Navn*" />
            </label>
            <label>
              
              <br />
              <input
                type="text"
                name="company"
                required
                placeholder="Firma/Organisation*"
                
              />
            </label>
            <label>
              
              <br />
              <input
                type="email"
                name="email"
                required
                placeholder="Email adresse*"
              />
            </label>
            <label>
              
              <br />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Telefon*"
              />
            </label>
            <label>
             
              <br />
              <textarea name="message" placeholder="Besked" />
            </label>

            <button id='contact-button' type="submit">Send</button>
          
          </form>
          

         {/* Hvis der er en bedsked.. sender den en h2 besked*/}
         {
            message && <p className='thankyou-message'>Tak fordi kontaktede FTA Travels. Din Besked er sendt, og du modtager en mail snarest</p>
          }

        {loading && <h1>Loading ...</h1>}

        {error && <h1>Der er opstået en fejl...</h1>}
    </section>
  )
}

export default Contact
