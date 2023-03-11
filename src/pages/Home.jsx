import React from 'react'

//KOMPONENTS
import Hero from '../components/Hero';
import Navbar from '../layouts/Navbar';
import About from '../components/About';
import Tours from '../components/Tours';
import ContactInformations from '../components/ContactInformations';


const Home = () => {
  return (
    <>
    <Hero />
    <Navbar />
    <About/>
    <Tours/>
    <ContactInformations/>
    
    </>
  )
}

export default Home