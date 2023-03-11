import React from 'react'
import { Outlet } from 'react-router-dom';

//Layout
import NavBar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
    {/* <header>
        <NavBar />
    </header> */}

    {/* Outlet "sendes til/vises i" Home-component */}
    <Outlet />

    <footer>
        <Footer />
    </footer>

    </>
  )
}

export default Layout