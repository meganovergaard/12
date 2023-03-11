import { useEffect, useState } from "react";

//** STYLE */
import './about.scss'

// Parse html-kode fra about content
import parse from 'html-react-parser';

// APIkald
import { getAbout } from "../helpers/apikald";

const About = () => {
  const [about, setAbout] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  // KØRE NÅR KOMPONENTEN ER LOADET OG KLAR
  useEffect(() => {
    setLoading(true); // Starter med at loade

    // SÅ SNART DER ER .then PÅ ER DET ASYNKRONT LOADING
    getAbout().then((response) => {
      if (response) {
        setAbout(response);
        setError(false);
      } else {
        setError(true);
        setAbout(); //tøm data
      }

      setLoading(false); // Slutter med at loade
    });
  }, []);

  return (
    <section className="about-container" id="about">
      
      <h1 className='about-heading'>OM OS</h1>

      {about && 
      
      <div className="about-content">
        
        
        <p className='content'>{parse (about.content) }</p>
        
        <img src={"http://localhost:5099/images/about/" + about.image} alt={about.title} title={about.title}/>
      </div>
      
      
      }

      {loading && <h1>Loading ...</h1>}

      {error && <h1>Der er opstået en fejl...</h1>}
    </section>
  );
};

export default About;
