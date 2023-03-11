import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom';

import AdminNavbar from './AdminNavbar';


// Hent login-status mv. fra context
import {LoginContext} from '../../context/LoginContext'

const AdminLayout = () => {

//*** ---------- TJEK FOR LOGIN --------- */
// snupper user fra context
const {user} = useContext(LoginContext); // HOOK

console.log('findes der en user?', user) 
// er null da vi ikke har indsat en user i staten == let [ user, setUser ] = useState( null );
// der kan tjekkes om der er en user ved at taste det ind i context-filen

// hvis der ikke (!user)  er en user altså at der ikke er logget ind - sendes brugeren ikke ind
if(!user){
return <Navigate to='/login' replace/> // redirect via Navigate
}
//*** ---------- SLUT TJEK FOR LOGIN --------- */


  return (
    <div>
      <AdminNavbar/>
      <Outlet />
      
    </div>

  )
}

export default AdminLayout