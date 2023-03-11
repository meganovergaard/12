import React, { useState } from "react";

import './pagination.scss';



// dette er det den bliver fodret med fra parent som er Pagination.jsx, så meget vigtigt at det er det samme som står der.
// kaldes destructure
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  
    // lav regnestykket - hvor mangge produkter der er i alt ... divideret med ... antal produkter per side = side 1 2 3 4 osv. 'klikbare sidenumre
    const [activePage, setActivePage] = useState(1)


  // vi skal have en variabel som viser hvor mange sider der skal laves (klik side-link) - beregnes ud fra amtal items pr. side og items ialt
  // fx. 100 produkter og der skal vises 20 produkter på hver side... hvor mange sider bliver der så? = 5
  const totalPageNumbers = Math.ceil(totalItems / itemsPerPage); // her runder vi op. ceil betyder op - floor betyder ned

  // alt det der skal ske når der klikkes på en side eller frem og tilbage
    const changePage = pageClicked => {

    if(pageClicked < 1) pageClicked = 1; // pageClicked må ikke blive mindre end 1 (0 -1 -2 osv.) HVIS så skal den være = 1
    if(pageClicked > totalPageNumbers) pageClicked = totalPageNumbers; // pageClicked må ikke blive størrer end 'antal-sider' (totalpagenumber) HVIS så skal den være = totalPageNumbers

    setActivePage(pageClicked); // gem i state hvilken side der er klikket på/skal vises
    paginate(pageClicked);
}


  return (
    <nav >
      <ul className="pagination">

        <li onClick={() => changePage(activePage - 1)}>tilbage</li>

        {                               // index er en tæller
          Array.from( { length: totalPageNumbers}, (item, index) => 
          
            <li onClick={ () => changePage( index + 1)} key={index} className={index + 1 === activePage ? 'pageactive' : ''} > 
            {index + 1}
            </li>
          )
        }
        <li onClick={() => changePage(activePage + 1)}>frem</li>
        </ul>
    </nav>
  );
};

export default Pagination;
