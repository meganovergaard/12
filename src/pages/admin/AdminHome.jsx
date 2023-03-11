import React from 'react'

// Billede
import ForsideImg from '../../assets/images/forside.jpg'

// STYLE 
import './adminHome.scss'
const AdminHome = () => {
  return (
    <div className="adminHome-container">
      <div className="admin-img"><img src={ForsideImg} alt="Admin billede" /></div>
      <h1 className="admin-home__heading">Velkommen til din admin side</h1>
      <p className="admin-home__text">Herinde kan du administrer dine dataer.</p>

    </div>
  )
}

export default AdminHome
