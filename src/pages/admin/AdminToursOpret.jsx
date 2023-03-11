import { useState } from "react";

//** CKEditor */
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from "@ckeditor/ckeditor5-react"

// API KALD
import { opretTour } from "../../helpers/apikald";

//** STYLE */
import './adminToursOpret.scss';

// import hook som viser thumbnails - dette er en custom hook
import useShowThumb from "../../hooks/useShowThumb";
//Hooks giver os mulighed for at "hooke" ind i React-funktioner såsom state.

const AdminToursOpret = () => {

// STATE
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  //'state' til customhook - thumb-image
const [ thumb, setThumb] = useShowThumb()
const [ galleryThumb, setGalleryThumb] = useShowThumb()

 //STATE til beskrivelse (indhold til/fra CKEditor)
// CKEditor-tekst (tekst fra CKEditor - hentes her fra state til textarea)
const [editortxt, setEditortxt] = useState()

const handleSubmit = (e) => {
    e.preventDefault(); 

    // send/post treaatment til api
    const tour = new FormData(e.target); // apiet vil gerne have formdata
    setLoading(true);

    //** Send treatment til apikaldsfilen -> api' et */
    opretTour(tour).then((response) => {
        if (response) {

            setMessage('Der er oprettet et nyt rejsemål');
            setError()
    
            //Tøm formular
            e.target.reset();
            //** Tøm state så editor også tømmes */
            setEditortxt('');
            //** Tøm thumb*/
            setThumb();
            setGalleryThumb();
    
          } else {
            //HVis fejl, send en besked
            setError(true)
            setMessage()
    
            //console.log("FEJL");
          }
    
          setLoading(false);
        });
      };

  return (
    <section className="admin-opret-container">
      <h1 className='opret-tour-heading'>Indtast nye rejsemål herunder. </h1>

      {/* ALERT BOX */}
      {
        message && <h2 className='besked'>{message} </h2>
      }

      <form onSubmit={handleSubmit}>
        {/* INDSÆT INDHOLD FRA BODY POSTMAN HER - HUSK DET SKAL VÆRE PRÆCIS DET SAMME */}
        
        <label>
            <h4>Titel</h4>
            <input type='text' name='title' placeholder='Skriv titel' />
        </label>
        <label>
            <h4>Teaser text</h4>
          <textarea className='text-area' name='teaser' placeholder="Indtast rejsebeskrivelse"></textarea> 
        </label>
        <br/>
        <label>
            <h4>Rejse beskrivelse</h4>
          {/*  CKEDITOR TIL TEXTARA  */}
          <textarea className='ckeditor' defaultValue={editortxt} name='content' placeholder="Skrive rejsebeskrivelse" style={{display: 'none'}}></textarea>
            <CKEditor
            editor= {Editor}
            data={editortxt} //data der skal være i editoren når den loader/opdater
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditortxt(data);
            }}
            />
        </label>
        <br/>
        {/* ----------------- CKEDITOR SLUT ---------------------------------------------- */}

        <label>
            <h4>Værelses beskrivelse:</h4>
          <textarea className='text-area' name='roomtype' placeholder="værelses beskrivelse" ></textarea>
        </label>
        <br/>
        
        <label>
            <h4>Rejse dato</h4>
            <input type='date' name='traveldate' placeholder='Hvor mange rejsedage' />
        </label>

        <label>
            <h4>Antal dage</h4>
            <input type='number' name='duration' />
        </label>

        <label>
            <h4>Minumum pris</h4>
            <input type='number' name='priceminimum' />
        </label>
        
        <label>
            <h4>Maximun pris</h4>
            <input type='number' name='pricemaximum' />
        </label>

        <label>
            <h4>Bedømmelse af opholdet</h4>
            <input type='number' name='rating' />
        </label>

        <div className='upload'>
        <label>
            <h4>Upload cover billede</h4>
            <input type='file' name='image' onChange={(e) => setThumb(e.target.files[ 0 ])}/>
            {
              // scope til at vise thumb-image med brug af custom-hook
              thumb && <img src={thumb} width='100' alt="thumb"/>
            }
        </label>

        <label >
            <h4>Upload billede til galleri</h4>
            <input type='file' name='galleryimages' onChange={(e) => setGalleryThumb(e.target.files[ 0 ])}/>
            {
              // scope til at vise thumb-image med brug af custom-hook
              galleryThumb && <img src={galleryThumb} width='100' alt="thumb"/>
            }
        </label>
        
        </div>
        
        <button className='button-submit_admin-tours-opret' type='submit-button'>Opret rejsemål</button>
      </form>

      {loading && <h1>Loading ...</h1>}

      {error && <h1>Der er opstået en fejl...</h1>}

    </section>
  )
}

export default AdminToursOpret
