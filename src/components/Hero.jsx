import React from 'react'
import { FaArrowDown } from "react-icons/fa";

//STYLE
import './hero.scss'

// LOGO
import LogoLille from '../assets/images/logo.png'
import LogoStor from '../assets/images/hero.png'

const Hero = () => {
  return (
    <section className="hero-container">
      
      <div className="logo-small"><img src={LogoLille} alt="lille logo" /></div>
      <h1 className='events'>Events</h1>
      <div className="logo-big"><img src={LogoStor} alt="lille logo" /></div>
      <h1 className='travels'>Travels</h1>
      <FaArrowDown className='arrow-icon bounce'/>
    </section>
  )
}

export default Hero
