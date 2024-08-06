import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Cookies from 'js-cookie';
import App from './App.jsx'
import './index.css'
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

function Navbar() {
  const routeChange = () => {
    let path = import.meta.env.VITE_SITE;
    navigate(path);
  }
  const [deviceType, setDeviceType] = useState(null);
  let isMobile;
  if (window.innerWidth < 768) {
    isMobile = true;
  }
  else {
    isMobile = false;
  }
  console.log(import.meta.env.VITE_HOST);
  if (isMobile) {
    return (
      <>
        <nav class="navbar navbar-expand-sm bg-success navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand lead" href="/list">eKmet</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link text-light fw-bolder" href="/list">Govedo</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light fw-bolder" href="/list">Drobnica</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light fw-bolder" href="/list">Živali</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light fw-bolder" href="/crede">Črede</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }

  else {
    return (
      <>
        <nav class="navbar navbar-expand-sm bg-success navbar-dark d-flex p-2 justify-content-between">
          <div class="container-fluid w-200">
            <ul class="navbar-nav d-flex  w-100">
              <a class="navbar-brand flex-grow-1 lead" href="/list">eKmet</a>
              <li class="nav-item flex-grow-1 fw-bolder lead">
                <a class="nav-link" href="/list">Živali</a>
              </li>
              <li class="nav-item flex-grow-1 fw-bolder lead">
                <a class="nav-link" href="/crede">Črede</a>
              </li>
              <li class="nav-item ml-auto fw-bolder lead">
                <a class="nav-link" onClick={() => { document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; }} href="/">Odjava</a>
              </li>
            </ul>
          </div>
        </nav>

      </>
    );
  }
}
function LoginNavbar() {
  const [deviceType, setDeviceType] = useState(null);
  let isMobile;
  if (window.innerWidth < 768) {
    isMobile = true;
  }
  else {
    isMobile = false;
  }
  console.log(import.meta.env.VITE_API);
  if (isMobile) {
    return (
      <>
        <nav class="navbar navbar-expand-sm bg-success navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand lead m-auto" href="/list">eKmet</a>
          </div>
        </nav>
      </>
    );
  }

  else {
    return (
      <>
        <nav class="navbar navbar-expand-sm bg-success navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand fw-bolder lead m-auto" href="/">eKmet</a>
          </div>
        </nav>
      </>
    );
  }
}
function AddButton() {
  const [isShown, setShown] = useState(false);
  return (
    <>
      {isShown ? <AddForm /> : null}
      <img class="position-fixed bottom-0 end-0 m-3 img-fluid" src="/src/plus.png" id="add" onClick={() => setShown(!isShown)}></img>
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>


    <Routes>
      <Route path="/" element={<><LoginNavbar /><LoginForm /></>} />
      <Route path="/register" element={<><LoginNavbar /><RegistrationForm /></>} />
      <Route path="/:ID" element={<><Navbar /><Details /></>} />
      <Route path="/list" element={<><Navbar /><List /><AddButton /></>}></Route>
      <Route path="/crede" element={<><Navbar /><Creda /></>}></Route>
      <Route path="/crede/:ID" element={<><Navbar /><CredaList /></>}></Route>
      <Route path='/reset' element={<><LoginNavbar /><ResetForm /></>}></Route>
      <Route path='/reset/:token' element={<><LoginNavbar /><ResetPass /></>}></Route>
    </Routes>

  </BrowserRouter>
)
