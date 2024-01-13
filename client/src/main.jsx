import React, {useEffect,useState} from 'react'
import ReactDOM from 'react-dom/client'
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


function Navbar(){
    const [deviceType, setDeviceType] = useState(null);
    let isMobile;
    if(window.innerWidth<768){
      isMobile=true;
    }
    else{
      isMobile=false;
    }
    console.log(isMobile);
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
            <li className="navbar"><h3>eKmet logo</h3></li>
            <li className="navbar"><a className='navi' href="/">Govedo</a></li>
            <li className="navbar"><a className='navi' href="/">Drobnica</a></li>
            <li className="navbar"><a className='navi' href="/crede">Živali</a></li>
            <li className="navbar"><a className='navi' href="/">Črede</a></li>
            <li className="navbar" id="userIcon"><img className="zivalPic" src="/src/user_icon.png"></img></li>
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
    <Route path="/:ID" element={<Details/>}/>
    <Route path="/" element={<List/>}></Route>
  </Routes>
    <AddButton />
  </BrowserRouter>
)
