import './App.css';
import { Route, Routes } from 'react-router-dom';

// COMPONENTS
import Layout from './layouts/Layout';

//PAGES
import Home from './pages/Home';
import About from './components/About';
import Login from './pages/admin/Login'
import Search from './pages/Search';
import NoMatch from './pages/NoMatch';

//** ADMIN SEKTION */
import AdminHome from './pages/admin/AdminHome';
import AdminLayout from './layouts/admin/AdminLayout';
import AdminTours from './pages/admin/AdminTours';
import AdminToursRet from './pages/admin/AdminToursRet';
import AdminToursOpret from './pages/admin/AdminToursOpret';
import AdminAboutRet from './pages/admin/AdminAboutRet';
import AdminAbout from './pages/admin/AdminAbout';
import AdminContact from './pages/admin/AdminContact';

// LOGIN funktion simuleret med kode 1234 bruger vælger man selv - Context-provide - fungere globalt med state
import LoginContextProvider from './context/LoginContext';





function App() {
  return (
    <>
      <LoginContextProvider>
      <Routes>
        {/* PUBLIC ROUTE */}
        {/* Grundlæggende Layout på alle sider */}
        <Route path="/" element={<Layout/>}>
          {/* Da det er en onepage har jeg bygget det meste op i komponenter og samlet dem i HOME */}
          <Route index element={<Home/>}/>
          
          <Route path='login' element={<Login/>}/>
          <Route path='search' element={<Search/>}/>
          <Route path='*' element={<NoMatch/>}/> 
        </Route>   


        {/* ADMIN-routes  */ }
        <Route path="/admin" element={ <AdminLayout /> } >
          <Route index element={<AdminHome/>}/>
          <Route path='admintours' element={ <AdminTours/> } />
          <Route path='adminabout' element={ <AdminAbout/> }/>
          <Route path='admincontact' element={ <AdminContact/> }/>
          <Route path='admintoursopret' element={ <AdminToursOpret/> } />
          <Route path='admintoursret/:id' element={ <AdminToursRet /> } />
          <Route path='adminaboutret/:id' element={ <AdminAboutRet /> } />

        
        </Route> 
      </Routes>
      </LoginContextProvider>
    
    </>
  );
}

export default App;
