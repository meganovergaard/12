import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
//useParams returnerer et objekt med nøgle/værdi-par af URL-parametre. Brug det til at få adgang til et match.
// Henter her id fra routeren i app.jsx

//STYLE 
import './adminAboutRet.scss';

//** CKEditor */
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from "@ckeditor/ckeditor5-react"

//** API */
import {getAboutId,retAbout} from '../../helpers/apikald'

// import hook som viser thumbnails - dette er en custom hook
import useShowThumb from "../../hooks/useShowThumb";

const AdminRetAbout = () => {
//** VIGTIGT
  // snup id fra url'en - så vi ved hvad der skal indlæses og rettes
  const { id } = useParams();
  console.log(id);

  const [retAboutState, setRetAboutState] = useState(); // Den tour der skal rettes
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  
  // skifter imellem true/false når der rettes - og useEffect lytter på rettelser = data opdateres
    const [updatetoggle, setUpdatetoggle] = useState(); 

  //'state' til customhook - thumb-image
  //Hooks giver os mulighed for at "hooke" ind i React-funktioner såsom state.
    const [ thumb, setThumb] = useShowThumb()

  //STATE til beskrivelse (indhold til/fra CKEditor)
  // CKEditor-tekst (tekst fra CKEditor - hentes her fra state til textarea)
  const [editortxt, setEditortxt] = useState() 

  //Kald API og hent den tour (ud fra id) som skal rettes
  useEffect(() => {
    setLoading(true); // Starter med at loade

    // SÅ SNART DER ER .then PÅ ER DET ASYNKRONT LOADING
    getAboutId(id).then(response => {
      if (response) {
        setRetAboutState(response);
        setError(false);
      } else {
        setError(true);
        setRetAboutState(); //tøm data
      }

      setLoading(false); // Slutter med at loade
    });
  }, [updatetoggle]); 


   // GØR SÅ FORMULAEREN IKKE RELOADER
   const handleSubmit = (e) => {
    e.preventDefault();

    // send post treatment til api
    const rettetAbout = new FormData(e.target); // apiet vil gerne have formdata
    setLoading(true);

    // Send treatment til apikaldsfilen -> api'et
    retAbout(id, rettetAbout).then((response) => {

      if (response) {
        //console.log(response.message);

        setMessage("Du har nu rettet dit rejsemål");
        setUpdatetoggle(!updatetoggle); // sæt updatetoggle- state til at være modsat det den er nu =  ændre sig hvis alt går godt
        // udråbstegn betyder ! at den ændre sig, hvis denne ikke var der ville den ikke rettet sig
        e.target.reset(); // nulstil formular
        setThumb(); // tøm shumb-image for indhold(data-stream)
        setError();

      } else {

        //HVis fejl, send en besked
        setError(true);
        setMessage();

        //console.log("FEJL");
      }

      setLoading(false);
    });
  };





  return (
    <section className="about-ret-container">

      <h1>Ret Om os</h1>




        {message && <h2 className="alert">{message} </h2>}

    {retAboutState && (
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <br />
            <input type="text" name="title" defaultValue={retAboutState.title} />
          </label>

          {/* <label> Beskrivelse: <br /> */}
            <textarea name="content" placeholder="beskrivelse" defaultValue={editortxt} style={{display: 'none'}} /> 
            <CKEditor
            editor= {Editor}
            data={retAboutState.content} //data der skal være i editoren når den loader/opdater
            onReady={(editor) => setEditortxt(editor.getData())} // Når ckeditor er klar tager den det data der er i den, og putter den op i editor tekst
            onChange={(event, editor) => setEditortxt(editor.getData()) } //gem editoren data/teksten i state (som bruges af textarea)
            
            />

          {/* </label> */}

          <div>
            <h4>Nuværende billede</h4>
            <img
              src={"http://localhost:5099/images/about/" + retAboutState.image}
              alt="Nuværende billede"
              width="50"
            />
          </div>

          <label>
            Væl eventuelt et nyt billede(overskriver det gamle billede)
            <br />
            <input type="file" name="image" onChange={(e) => setThumb(e.target.files[ 0 ])}/>
            {
              // scope til vis thumb-image med brug af custom-hook
              thumb && <img src={thumb} width='50' alt="thumb"/>
            }
          </label>
          <br />
          <button type="submit">Ret About</button>
        </form>
      )}

  {loading && <h1>Loading ...</h1>}

  {error && <h1>Der er opstået en fejl...</h1>}
      
    </section>
  )
}

export default AdminRetAbout
