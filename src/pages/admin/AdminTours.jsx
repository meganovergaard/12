import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// *** ICONS **/
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

//**STYLE */
import './adminTours.scss';


// API kald
import { getTours, sletTour } from "../../helpers/apikald";

const AdminTours = () => {

  const [tours, setTours] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

   //state til slet funktionen
   const [besked, setBesked] = useState();

  // useEffect KØRE NÅR KOMPONENTEN ER LOADET OG KLAR
  useEffect(() => {
    setLoading(true); // Starter med at loade

    // SÅ SNART DER ER .then PÅ ER DET ASYNKRONT LOADING
    getTours().then((response) => {
      if (response) {
        setTours(response);
        setError(false);
      } else {
        setError(true);
        setTours(); //tøm data
      }

      setLoading(false); // Slutter med at loade
    });
  }, [besked]); // besked gør at at useEffecten lytter til om der er sket en ændring i staten, 
                // og når der er det, reloades siden.


  //onCLick funktionen til SLET
  const handleSlet = (id) => {
    //console.log('slet-klik', id) // tjekker om klikket virker

    //**** https://www.w3schools.com/jsref/met_win_confirm.asp - popup box som spørger om man vil slette..
    if (window.confirm('vil du slette?') === true) {

    setLoading(true); 

    sletTour(id).then((response) => {

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
    <setion className='admin-tours-container'>
        <div className='info-top'>
      <h1>Få et overblik over rejsemålene - og ret eller slet dem.</h1>
      <p>Husk at dette ikke kan fortrydes.</p>
      </div>
      {tours && (
        <table>
          {/* Dette er toppen af tabellen */}
          <thead>
            <tr>
              <th>Treatment img</th>
              <th>Name</th>
              <th>Ret</th>
              <th>Slet</th>
            </tr>
          </thead>
          <tbody>
            {
              /* da vi allerede er har spurgt om der er tours i loppet, spørger vi kun en gang her */
              tours.map((t) => (
                <tr key={t._id}>
                  <td className="imageCol">
                    <img
                      src={"http://localhost:5099/images/tours/" + t.coverimage}
                      alt="treatments thumb"
                      width={100}
                    />
                  </td>
                  
                  <td>{t.title}</td>

                  <td>
                    <Link to={"/admin/admintoursret/" + t._id}>
                      <AiFillEdit />
                    </Link>
                  </td>
                  <td>
                    <AiFillDelete onClick={() => handleSlet(t._id)} />
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
  );
};

export default AdminTours;
