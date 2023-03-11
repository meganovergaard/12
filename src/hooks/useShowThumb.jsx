import { useState } from 'react'

// kode hentet fra C:\Marianne\asp.net\_REACT\_DATASERVICE-BACKEND-FILEUPLOAD\_Eksamensapi\Bageriet\bageriettemp\src\components\admin\produkter\OpretProdukt.jsx
// Se video om custom hooks her - se video 30 til 33:
// https://www.youtube.com/watch?v=l-s9MgoMwTI&list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A&index=30
// Lidt mere kompleks: https://www.youtube.com/watch?v=6ThXsUwLWvc


/*
    Bruges sådan her:
    import useShowThumb from '../hooks/useShowThumb'
    const [ thumb, makeThumb ] = useShowThumb() // state til thumb-image fra file-input

    const resetFileupload = ( e ) => {
        e.target.form.image.value = "";
        makeThumb("");
    }

    <input type="file" onChange={ ( e ) => makeThumb( e.target.files[ 0 ] ) } name="image" required />
    {
        thumb &&
        <img src={ thumb } width="100px" alt="Thumb" />
    }
    <button onClick={ ( e ) => resetFileupload( e ) }>X</button>
*/

const useShowThumb = () => {

    const [ thumb, setThumb ] = useState()

    const makeThumb = file => {

        if ( file ) {

            let reader = new FileReader();

            reader.onload = ( r ) => {
                setThumb( r.target.result )
            }

            reader.readAsDataURL( file )
        } else {
            setThumb();
        }

    }

    return [ thumb, makeThumb ]

}

export default useShowThumb
