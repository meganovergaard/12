import { useEffect, useState } from "react";

//**** STYLE */
import './contact.scss';

//** ICONS */
import { BsTelephone, BsEnvelope } from "react-icons/bs";

//** KOMPONET **/
import ContactForm from './ContactForm';
import NewsLetter from './NewsLetter'

//** API KALD */
import {getContactInformation} from '../helpers/apikald'

const ContactInformations = () => {
    const [contactInfo, setContactInfo] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    // KØRE NÅR KOMPONENTEN ER LOADET OG KLAR
  useEffect(() => {
    setLoading(true); // Starter med at loade

    // SÅ SNART DER ER .then PÅ ER DET ASYNKRONT LOADING
    getContactInformation().then((response) => {
      if (response) {
        setContactInfo(response);
        setError(false);
      } else {
        setError(true);
        setContactInfo(); //tøm data
      }

      setLoading(false); // Slutter med at loade
    });
  }, []);

  return (
    <section className='contact-container' id='contact'>
      <h1 className="contact-heading">Kontakt</h1>
      

      {contactInfo && 
      
      <div className="contact-info">
        <h1>Kontakt Information</h1>
        <h2>{contactInfo.company} </h2>
        <p>{contactInfo.adresse} </p>
        <p>{contactInfo.zipcity} </p>
        <p>{contactInfo.country} </p>
        <p><BsTelephone/> {contactInfo.phone} </p>
        <p><BsEnvelope/> {contactInfo.email} </p> 
      </div>
      
      }

      <div className="newsletter-signup">
      <NewsLetter />
      </div>

      <div className="contact-form"> 

      </div>

      {loading && <h1>Loading ...</h1>}

      {error && <h1>Der er opstået en fejl...</h1>}

      <div className='contactform'>
      <ContactForm/>
      </div>

    </section>
  )
}

export default ContactInformations
