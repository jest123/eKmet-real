import React, {useEffect,useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


  function AddButton(){
    const [isShown, setShown] = useState(false);  
        return (
          <>
          {isShown ? <AddForm /> : null}
          <img src="/src/plus.png" id="add" onClick={() => setShown(!isShown)}></img>
          </>
        );
    }
    function AddForm(){
      return(
        <div className='addDiv'>
            <img src='./public/exit.png' id="exit" onClick={() => {document.getElementById("root").removeChild(document.getElementsByClassName("addDiv")[0]);}}></img>
            <form method='POST' action="http://localhost:5000/add">
                <label >Ušesna številka:</label><br/>
                <input name="ZivalID" placeholder='Ušesna številka' required></input><br/>
                <label >Spol:</label><br/>
                <select name="spol" size="1" required>
                  <option value="M">Moški</option>
                  <option value="Z">Ženski</option>
                </select><br/>
                <label >Pasma:</label><br/>
                <input name="Pasma" placeholder='Pasma'></input><br/>
                <label >Datum rojstva:</label><br/>
                <input name="DatumRojstva" type="date" required></input><br/>
                <label >Oče:</label><br/>
                <input name="Oce"></input><br/>
                <label >Mati:</label><br/>
                <input name="Mati"></input><br/>
                <label >Ime:</label><br/>
                <input name="Ime"></input><br/>
                <input type="submit"></input>
            </form>
        </div>
      );
    }
 function List(){
  const [backendData, setBackendData] = useState([{}]);
  useEffect(()=>{
    fetch(`http://localhost:5000/list`).then(
      response => response.json()
      ).then(
        data=>{
          setBackendData(data);
        }   
      )
  },[]);
        return (
          <div>
            {(backendData.map((item) => (
            <div className='zival'>
                  <img src="./image.png" alt="Slika zivali" className='zivalImg'></img>
                  <b>{item.ZivalID}</b>
                  <p>{item.SPOL}</p>
                  <p>{(new Date(item.DatumRojstva*1000)).toLocaleDateString()}</p>
            </div>
            )))}
          </div>
        ); 
      };
      const root=ReactDOM.createRoot(document.getElementById('root')).render(
      <>
        <List/>
        <AddButton/>
      </>
 )