import React, {useEffect,useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

  class AddButton extends React.Component{
      handleClick(){
            return <AddForm/>;
      }
      render(){
        return (
          <img src="/src/plus.png" id="add" onclick={()=>this.handleClick()}></img>
        );
      }
    }
    class AddForm extends React.Component{
      render(){
        return(
          <div className='addDiv'>
              <form method='POST' action="http://localhost:5000/add">
                  <label for="ZivalID">Ušesna številka:</label><br/>
                  <input name="ZivalID" placeholder='Ušesna številka'></input><br/>
                  <label for="spol">Spol:</label><br/>
                  <select name="spol" size="1"><br/>
                    <option value="M">Moški</option>
                    <option value="Z">Ženski</option>
                  </select><br/>
                  <label for="Pasma">Pasma:</label><br/>
                  <input name="Pasma" placeholder='Pasma'></input><br/>
                  <label for="DatumRojstva">Datum rojstva:</label><br/>
                  <input name="DatumRojstva" type="date"></input><br/>
                  <input type="submit"></input>
              </form>
          </div>
        );
      }
    }
function fetchData(){
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
      return data;
            
}
 class List extends React.Component{
      backendData = fetchData();
      render(){
        return (
          <div>
            {(backendData.map((item) => (
            <div className='zival'>
                  <img src="./image.png" alt="Slika zivali"></img>
                  <h2>{item.ZivalID}</h2>
                  <h4>{item.SPOL}</h4>
                  <h4>{(new Date(item.DatumRojstva*1000)).toLocaleDateString()}</h4>
            </div>
            )))}
          </div>
        ); 
      };
}
ReactDOM.createRoot(document.getElementById('root')).render(
      <List/>
 )