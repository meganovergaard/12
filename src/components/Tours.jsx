import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Rating from "@mui/material/Rating";
import moment from 'moment'
import Moment from 'react-moment'
import 'moment/locale/da'

//*** PAGINATION */
import Pagination from './Pagination'

//**STYLE */
import "./tours.scss";

//** COMPONENTS */
import Modal from "./Modal";

//*** API KALD */
import { getToursTeaser } from "../helpers/apikald";

const Tours = () => {
  // STATES
  const [tours, setTours] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  //SPROG
  moment.locale('da');

  
  
  //** START PAGINATION ----------*/
  //** STATE */
  //** ------------------------------------------------------------- */

  const [currentPage, setCurrentPage] = useState(1);    // den "side" vi er på lige nu - bruger funktionen paginate herunder
  const [itemsPerPage, setItemsPerPage] = useState(3); // antal produkter(items) pr. side


  //** VARIABLER som skal rumme page-værdier */ 
  let indexOfLastItem; // skal rumme index for første item som skal vises(afhængig af hvilken side som vises)
  let indexOfFirstItem; // skal rumme index for sidste item som skal vises

// side 3, 10 items/produkter/treatments pr. side, 100 items ialt
if (tours && tours.length) {
indexOfLastItem = currentPage * itemsPerPage;   // 3*10 = 30 står der her
indexOfFirstItem = indexOfLastItem - itemsPerPage; // 30 - 10 = 20 står der her
}

// FUNKTION til pagination-child så den kan ændre state som afgør hvilken "side" (produkter) der skal vises
const paginate = (pageNumber) => setCurrentPage(pageNumber)

//** SLUT PAGINATION ----------------------------*/



  // KØRE NÅR KOMPONENTEN ER LOADET OG KLAR
  useEffect(() => {
    setLoading(true); // Starter med at loade

    // SÅ SNART DER ER .then PÅ ER DET ASYNKRONT LOADING
    getToursTeaser().then((response) => {
      if (response) {
        setTours(response);
        setError(false);
      } else {
        setError(true);
        setTours(); //tøm data
      }

      setLoading(false); // Slutter med at loade
    });
  }, []); // de tomme klammer indikerer at vores state kun køre en gang

  return (
    <>
    
    <section className="tours-container" id='tours'>
      
      <h1 className='tours-heading'>REJSEMÅL</h1>

    


      {
      
      tours &&

        <>
          <div id='pagination-component'>
          <Pagination  itemsPerPage={itemsPerPage} totalItems={tours.length} paginate={paginate} />
          </div>
          <div className="tours-container__card">
        {

        tours.slice(indexOfFirstItem, indexOfLastItem).map((index) => (
          <div key={index._id} >
            <div className='cards'>
              <img
                src={"http://localhost:5099/images/tours/" + index.coverimage} alt={index.title} title={index.title} key={index._id} 
              />
                <div className='top-card__rate-heading'>
                <h2>{index.title}</h2>
                <Rating name="read-only" value={index.rating} readOnly sx={{ color: "#be0007" }}/>
                </div>
                
                <p>{moment(index.traveldate).format('DD-MMM-YYYY')}</p>
                <p>{parse(index.teaser)}</p>
              
              
              <Modal index={index}/>
            </div>
          </div>
        ))}
        </div>
        </>
        }
        

      {loading && <h1>Loading ...</h1>}

      {error && <h1>Der er opstået en fejl...</h1>}
    </section>
    </>
  );
};

export default Tours;
