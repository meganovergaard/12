// Her henter vi vores eget api kald, start altid med use state og useeffect
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Parse html-kode fra about content
import parse from "html-react-parser";

//*** ICON */
import { FaArrowLeft } from "react-icons/fa";

//** STYLE **/
import "./search.scss";

//*** API  */
import { searchTours } from "../helpers/apikald";

const Search = () => {
  const [soegeord, setSoegeord] = useState();

  const [findeTours, setFindeTours] = useState();
  const [error, setError] = useState();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (soegeord && soegeord.length > 0) {
      setLoader(true);

      // DETTE ER ET TYPISK EKSEMPEL PÅ ET PROMISE
      searchTours(soegeord)
        .then((data) => {
          setLoader(false);
          //console.log(data);
          setFindeTours(data);
          setError(); // tøm fejlbesked, hvis der har været en fejl og fejlen nu er løst

          // Fanges fejlen her
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          // Giver fejl beskeden
          setError("Der er sket en fejl");
          setFindeTours();
        });
    } else {
      setFindeTours();
    }
  }, [soegeord]);

  return (
    <div className="search-container">
      <h1 className="search-heading">Søg efter rejsemål</h1>
      <Link to="/"> <button className="back-button"><FaArrowLeft className="arrow" /></button></Link>
      
      <input
        type="text"
        placeholder="Søg efter rejsemål"
        onChange={(e) => setSoegeord(e.target.value)}
      />

      <div className="search-box">
        {/* HER MAPPER VI UD */}
        {findeTours && (
          <>
            <h2 className="search-result">
              Antal rejsemål: {findeTours.length}
            </h2>
            {findeTours.map((f) => (
              // første element i react skal altid have en unik key - her bruger vi id fra Mongo
              <div className="search" key={f.key}>
                <h2>{f.title}</h2>
                <p>{parse(f.content)}</p>
              </div>
            ))}
          </>
        )}
      </div>

      {loader && <h1> Loader...</h1>}

      {/* DER ER OPSTÅET EN FEJL */}
      {error && (
        <div>
          <h1>Der er en fejl</h1>
        </div>
      )}
    </div>
  );
};

export default Search;
