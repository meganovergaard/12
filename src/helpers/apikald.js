import axios from "axios"

//*** BASE URL
const api= {
    baseUrl: "http://localhost:5099/",
    imageUrl: "http://localhost:5099/images/"
}

export let imageUrl = api.imageUrl;


//*** API KALD */

//******* ABOUT *************************************************************/

// ---------- ABOUT - BLIVER IKKE MAPPET DA DET IKKE ER ET ARRAY
// -------------------------------------------------------------

// Hent about - GET http://localhost:5099/about
            //ELLER hentAbout
            export const getAbout = () => {
                let response = axios.get(api.baseUrl + 'about')
                //ENTEN FÅR VI DATA
                .then(res => {
                    return res.data;
                })
                //ELLER FÅR VI FEJL som retunere null
                .catch(error => {
                    console.log(error)
                    return null
                })
                // ALTID HUSK AT RETUNERE RESPONSE
                return response; // DATA ELLER NULL
            }


//******* TOURS *************************************************************/
// ---------- Tours card -  GET METODE
// -------------------------------------------------------------
// HENT ALLE TOURS TEASERs
//hent Tours - GET http://localhost:5099/tours/teaser
export const getToursTeaser = () => {
    let response = axios.get(api.baseUrl + 'tours/teaser')
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}


// ---------- Tours modal -  GET METODE
// -------------------------------------------------------------
// HENT ALLE TOURS
//hent Tours - GET http://localhost:5099/tours
export const getTours = () => {
    let response = axios.get(api.baseUrl + 'tours')
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}


//********************* CONTACT  ***********************************************/
// ---------- CONTACT DETAILS - BLIVER IKKE MAPPET DA DET IKKE ER ET ARRAY
// -------------------------------------------------------------
// Hent contact details - GET http://localhost:5099/contactinformation

    export const getContactInformation = () => {
        let response = axios.get(api.baseUrl + 'contactinformation')
        //ENTEN FÅR VI DATA
        .then(res => {
            return res.data;
        })
        //ELLER FÅR VI FEJL som retunere null
        .catch(error => {
            console.log(error)
            return null
        })
        // ALTID HUSK AT RETUNERE RESPONSE
         return response; // DATA ELLER NULL
            }


// ---------- CONTACT FORM - POST METODE
// -------------------------------------------------------------
//  POST - http://localhost:5099/contact

export const newContact = (newmessage) => {        // dette er det man kalder body
    let response = axios.post(api.baseUrl + 'contact', newmessage) //komma betyder at der kommer noget nyt som også skal med
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}

// ---------- SIGN UP TO EMAIL - POST METODE
// -------------------------------------------------------------
//  POST - hhttp://localhost:5099/newssubscription

export const newSubscription = (newsignup) => {   // dette er indholdet man kalder body
    let response = axios.post(api.baseUrl + 'newssubscription', newsignup) //komma betyder at der kommer noget nyt som også skal med
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}


//********************* FOOTER ***********************************************/

// ---------- FOOTER - BLIVER IKKE MAPPET DA DET IKKE ER ET ARRAY
// -------------------------------------------------------------

// Hent footer - GET http://localhost:5099/footer
            
            export const getFooter = () => {
                let response = axios.get(api.baseUrl + 'footer')
                //ENTEN FÅR VI DATA
                .then(res => {
                    return res.data;
                })
                //ELLER FÅR VI FEJL som retunere null
                .catch(error => {
                    console.log(error)
                    return null
                })
                // ALTID HUSK AT RETUNERE RESPONSE
                return response; // DATA ELLER NULL
            }



//****** SØGEFUNKTION **************************************************/

            // SØGEFUNKTION ----------------- GET METODE ------ 
//http://localhost:5099/tours/soeg/søgeordher
// hent udvalgt treatment
export const searchTours = (søgeordher) => {
    let response = axios.get(api.baseUrl + 'tours/soeg/' + søgeordher)
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}



//****** ADMIN SEKTION **************************************************/

// --------------------PUT METODE
// ret About - data sendes tilbage http://localhost:5099/about/admin

export const retAbout = (id, aboutRettet) => {
    let response = axios.put(api.baseUrl + '/about/admin' + id, aboutRettet)
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}

// ----------------- GET METODE
//hent Tours ud fra id http://localhost:5099/about
// hent udvalgt tours
export const getAboutId = () => {
    let response = axios.get(api.baseUrl + 'about')
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}



// --------------------PUT METODE
// ret Tour - data sendes tilbage http://localhost:5099/tours/admin/6255cfb40b7abe9bb00a7014

export const retTour = (id, rettetTour) => {
    let response = axios.put(api.baseUrl + 'tours/admin/' + id, rettetTour)
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}

// ----------------- GET METODE
//hent Tours ud fra id http://localhost:5099/tours/625c787debadcefe8ed39ac9
// hent udvalgt tours
export const getChoosenTour = (id) => {
    let response = axios.get(api.baseUrl + 'tours/' + id)
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}



// ---------- OPRET TREATMENT - POST METODE
// http://localhost:5099/tours/admin

export const opretTour = (nytour) => { 
    let response = axios.post(api.baseUrl + 'tours/admin', nytour)
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}

//------------------- DELETE METODE - TOURS
//-------------------------------------------------------------------
// DELETE - http://localhost:5099/tours/admin/xxxxxxxxxxxxxxxxxxxxx

export const sletTour = (tourId) => {
    let response = axios.delete(api.baseUrl + 'tours/admin/' + tourId)
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; // data eller null
}


//------------------- DELETE METODE - CONTACT
//-------------------------------------------------------------------
// DELETE - http://localhost:5099/contact/admin/xxxxxxxxxxxxxxxxxxxxx

export const sletContact = (contactId) => {
    let response = axios.delete(api.baseUrl + 'contact/admin/' + contactId)
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; // data eller null
}


// ---------- Contact Alle -  GET METODE
// -------------------------------------------------------------
// HENT ALLE Kontakter
//hent Tours - GET // HENT ALLE Kontakter
/// http://localhost:5099/contact/admin

export const getContactMesseges = () => {
    let response = axios.get(api.baseUrl + 'contact/admin')
    
    .then(res => {
        return res.data;
    })
    
    .catch(error => {
        console.log(error)
        return null
    })
    
    return response; 
}