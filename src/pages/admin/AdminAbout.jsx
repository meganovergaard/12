import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Parse html-kode fra about content
import parse from 'html-react-parser';


// *** ICONS **/
import { AiFillEdit} from "react-icons/ai";

//**STYLE */
import './adminAbout.scss'

// API kald
import {getAbout} from '../../helpers/apikald'

const AdminAbout = () => {

const [about, setAbout] = useState();
const [error, setError] = useState();
const [loading, setLoading] = useState(false);

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
    <setion className='admin-about-container'>
    
        <h1>Ret about indholdet herunder</h1>
      {about && (
        <table>
          {/* Dette er toppen af tabellen */}
          <thead>
            <tr>
              <th>Treatment img</th>
              <th>Name</th>
              <th>Ret</th>
            </tr>
          </thead>
          <tbody>
                <tr >
                  <td className="imageCol">
                      <img src={"http://localhost:5099/images/about/" + about.image} alt={about.title} title={about.title}
                      width={100}
                    />
                  </td>
                  
                  <td>{parse (about.content) }</td>

                  <td>
                    <Link to={"/admin/adminaboutret/" + about._id}>
                      <AiFillEdit />
                    </Link>
                  </td>
                </tr>
          </tbody>
        </table>
      )}

      {loading && <h1>Loading ...</h1>}

      {error && <h1>Der er opstået en fejl...</h1>}
    </setion>
  )
}

export default AdminAbout
