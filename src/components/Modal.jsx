import React from 'react'
import { useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel'


//**STYLE */
import "./tours.scss";
import "./modal.scss";

// API kald
import { getTours } from "../helpers/apikald";

// MATERIAL UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from "@mui/material/Rating";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

//** MATERIAL UI STYLE */
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
};

export default function ModalBox(props)  {

    //console.log('tjek kald', props)
    // åben og luk state fra MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>  setOpen(true);
  const handleClose = () => setOpen(false);

   // STATES
   const [toursModal, setToursModal] = useState();
   const [error, setError] = useState();
   const [loading, setLoading] = useState(false);



   const [selectedTour, setSelectedTour] = useState();

   // KØRE NÅR KOMPONENTEN ER LOADET OG KLAR
  useEffect(() => {
  setLoading(true); // Starter med at loade

    // SÅ SNART DER ER .then PÅ ER DET ASYNKRONT LOADING
    getTours().then((response) => {
      if (response) {
        setToursModal(response);
        setError(false);
        setSelectedTour(response.find(function (t) { return t.title === props.index.title} )); 
        // Find den title som ikke er med i toursTeaser, da den ellers looper alle data ud igen
      } else {
        setError(true);
        setToursModal(); //tøm data
      }

      setLoading(false); // Slutter med at loade
    });
    
  }, [props]);

  

  return (
    <section className="modal-container">
      <button className='button-modal' onClick={handleOpen }>Læs Mere</button>
      
      <Grid container>
        <Grid item >
      <Modal xs={6} md={8}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: 'scroll', height: '100%', mt: 10, mb: 10, top: '2%', bottom: '5%' }}
      >
        <Box sx={style}>
       
        {toursModal && 
            <div key={props.index._id}>
              <Typography variant="body2" gutterBottom>{selectedTour?.title}</Typography>
              <Divider sx={{mb: 2}}/>
              
              <Carousel>
              {
               selectedTour?.gallery.map (index => {
                 return(
                   <img className='gallery-img'src={'http://localhost:5099/images/tours/' + index} style={{height: 200, width:'100%', display: 'block', objektFit: 'cover', overflow: 'hidden'}} key={props.index._id} />
                 //console.log(index)
                 )
               })
             }
              </Carousel> 
            <Typography variant="h2" component="h2" gutterBottom sx={{fontSize: '1.5rem'}}>
                Rejsemål {selectedTour?.title} <Rating name="read-only" value={selectedTour?.rating} readOnly sx={{ color: "#be0007" , float: 'right'}}/>
            </Typography>  
            <Typography variant="body2" sx={{fontSize: '0.9rem', fontWeight: 'bold'}}>Du får: </Typography>       
          <Typography variant="body2" sx={{fontSize: '0.8rem'}}>
          {ReactHtmlParser(selectedTour?.content)} {/* Hvis der ikke er en selectedTour så vælg title */}
          </Typography>
          <Typography variant="body2" sx={{fontSize: '0.9rem', fontWeight: 'bold'}}>Værelsestype </Typography>
            <Typography variant="body2">
            {ReactHtmlParser(selectedTour?.roomtype)}
            </Typography>
            <Typography variant="caption">
            </Typography>

            <p>{moment(selectedTour?.traveldate).format('DD-MMM-YYYY')}</p>
            </div>
          }
          <Divider/>
       
          <Button variant="contained" onClick={handleClose} 
          sx={{
            backgroundColor: '#595959', 
            mt:1,
            '&:hover': {
              backgroundColor: '#8b8b8b',
              boxShadow: 'none',
            }}}>CLOSE</Button>
        </Box>
      </Modal>
      </Grid>
      </Grid>
     

      {loading && <h1>Loading ...</h1>}

        {error && <h1>Der er opstået en fejl...</h1>}
    </section>
  );
}
