import { useEffect, useState } from "react";

// APIkald
import { getFooter } from "../helpers/apikald";

// STYLE
import './footer.scss'


const Footer = () => {
  const [footer, setFooter] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  // KØRE NÅR KOMPONENTEN ER LOADET OG KLAR
  useEffect(() => {
    setLoading(true); // Starter med at loade

    // SÅ SNART DER ER .then PÅ ER DET ASYNKRONT LOADING
    getFooter().then((response) => {
      if (response) {
        setFooter(response);
        setError(false);
      } else {
        setError(true);
        setFooter(); //tøm data
      }

      setLoading(false); // Slutter med at loade
    });
  }, []);

  return (
    
<div className='footer-content'>
      {footer && 
      
      
        <h6>© {footer.footertext.substring(0,7)} <span className='red'>{footer.footertext.substring(7,18)}</span> {footer.footertext.substring(19,40)}</h6>
        
      }

      {loading && <h1>Loading ...</h1>}

      {error && <h1>Der er opstået en fejl...</h1>}
     </div> 
  )
  
}

export default Footer