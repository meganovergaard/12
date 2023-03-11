import { useEffect, useState } from "react";

// *** ICONS **/
import {AiFillDelete } from "react-icons/ai";

//** STYLE */
import './adminContact.scss'

// API kald
import {getContactMesseges, sletContact } from "../../helpers/apikald";

const AdminContact = () => {

  // HER HENTER JEG
  const [contactMesseges, setContactMesseges] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  //state til slet funktionen
  const [besked, setBesked] = useState()

   // KØRE NÅR KOMPONENTEN ER LOADET OG KLAR
   useEffect(() => {
    setLoading(true); // Starter med at loade

    // SÅ SNART DER ER .then PÅ ER DET ASYNKRONT LOADING
    getContactMesseges().then((response) => {
      if (response) {
        setContactMesseges(response);
        setError(false);
      } else {
        setError(true);
        setContactMesseges(); //tøm data
      }

      setLoading(false); // Slutter med at loade
    });
  }, [besked]); // besked gør at at useEffecten lytter til om der er sket en ændring i staten, og når der er det, reloades siden.


   //onCLick funktionen til SLET
   const handleSlet = (id) => {
    //console.log('slet-klik', id) // tjekker om klikket virker

    //**** https://www.w3schools.com/jsref/met_win_confirm.asp - popup box som spørger om man vil slette..
    if (window.confirm('vil du slette kontakten?') === true) {

    setLoading(true); 

    sletContact(id).then((response) => {

      if (response) {

        console.log('OK', response)
        setBesked('Du har nu slettet en treatment med ID' + id)
        

      } else {
        console.log('FEJL')
        setBesked('Noget gik galt - intet er slettet')
        
      }

      setLoading(false); // Slutter med at loade
    });
}
}

  return (
    <setion className='admin-contact-container'>
      <div className='contact-tekst'>
    <h1>Slet en kontakt besked</h1>
    <p>Husk at dette ikke kan fortrydes.</p>
    </div>
      {contactMesseges && (
        <table>
          {/* Dette er toppen af tabellen */}
          <thead>
            <tr>
              <th>Navn</th>
              <th>Firma</th>
              <th>Email</th>
              <th>Besked</th>
              <th>Modtaget</th>
              <th>Slet</th>
            </tr>
          </thead>
          <tbody>
            {
              /* da vi allerede er har spurgt om der er tours i loppet, spørger vi kun en gang her */
              contactMesseges.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.company}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.message}</td>
                  <td>
                    <AiFillDelete onClick={() => handleSlet(c._id)} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}

      {loading && <h1>Loading ...</h1>}

      {error && <h1>Der er opstået en fejl...</h1>}
    </setion>
  )
}

export default AdminContact;
