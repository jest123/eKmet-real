import React, {useEffect,useState} from 'react'
import ReactDOM from 'react-dom/client'
import Cookies from 'js-cookie';
import App from './App.jsx'
import './index.css'
import './script.js'
import './Details.jsx'
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Details from './Details.jsx'
import AddForm from './AddForm.jsx'
import List from './list.jsx'
import RegistrationForm from './registrationForm.jsx'
import LoginForm from './LoginForm.jsx'
import Creda from './crede.jsx'
import CredaList from './CredaList.jsx'
import ResetForm from './ResetForm.jsx';
import ResetPass from './ResetPass.jsx';

function Navbar(){
  const routeChange = () =>{ 
    let path = import.meta.env.VITE_SITE; 
    navigate(path);
  }
    const [deviceType, setDeviceType] = useState(null);
    let isMobile;
    if(window.innerWidth<768){
      isMobile=true;
    }
    else{
      isMobile=false;
    }
    console.log(import.meta.env.VITE_HOST);
    if(isMobile){
      return(
        <>
          <div className="topnav">
          <a href="#home" className="active">eKmet</a>
          <div id="myLinks">
            <a href="#news">Govedo</a>
            <a href="#contact">Drobnica</a>
            <a href="#about">Živali</a>
            <a href="#about">Črede</a>
          </div>
          <a className="icon" onClick={()=>{var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }}}>
            <i className="fa fa-bars"></i>
          </a>
        </div>
        </>
      );
    }

    else{
      return(
        <>
          <ul className="nav">
            <li className="navbar"><h3><a className='navi' href="/" id="home">eKmet logo</a></h3></li>
            <li className="navbar"><a className='navi' href="/list">Govedo</a></li>
            <li className="navbar"><a className='navi' href="/">Drobnica</a></li>
            <li className="navbar"><a className='navi' href="/">Živali</a></li>
            <li className="navbar"><a className='navi' href="/crede">Črede</a></li>
            <li className="navbar dropdown" id="userIcon" onClick={()=>{document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";}}><a className='navi' href="/"><img className="zivalPic" src="./public/logout.png"></img></a></li>
          </ul>
        </>
      );
    }
}
function AddButton(){
  const [isShown, setShown] = useState(false);  
  return (
    <>
    {isShown ? <AddForm /> : null}
    <img src="/src/plus.png" id="add" onClick={() => setShown(!isShown)}></img>
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
  
  <Routes>
    <Route path="/" element={<><LoginForm/></>}></Route>
    <Route path="/register" element={<><RegistrationForm/><br/>Že imaš račun?<br/><a href={import.meta.env.VITE_SITE+"/"}>Prijavi se</a></>}/>
    <Route path="/:ID" element={<Details/>}/>
    <Route path="/list" element={<><List/><AddButton /></>}></Route>
    <Route path="/crede" element={<><Creda/></>}></Route>
    <Route path="/crede/:ID" element={<><CredaList/></>}></Route>
    <Route path='/reset' element={<><ResetForm/></>}></Route>
    <Route path="/reset/:token"element={<><ResetPass/></>}></Route>
  </Routes>
    
  </BrowserRouter>
)
