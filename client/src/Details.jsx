import React, {useEffect,useState} from 'react'
import Cookies from 'js-cookie';
import {
    Link,
    useParams
  } from "react-router-dom";
export default function Details(props){
    let  {ID}=useParams()
    const [backendData, setBackendData] = useState([{}]);
    console.log(ID);
    let server="http://localhost:5000/details?ID="+ID;
    const options = {
      method: 'POST',
      headers: {'Authorization':Cookies.get("token") }
  };
    useEffect(() => {
      fetch(server,options).then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data);
        }
      )
    }, []);
    console.log(backendData.DatumRojstva);
    return(
        <>
        <form>
            <Link to="/"><button>Nazaj</button></Link>
            <h3>Ušesna številka: {backendData[0].ZivalID}</h3>
            <p>Spol: {backendData[0].SPOL}</p>
            <p>Datum rojstva: {(new Date(backendData[0].DatumRojstva*1000)).toLocaleDateString()}</p>
            <p>Pasma: {backendData[0].Pasma}</p>
            <p>Ime: {backendData[0].Ime}</p>
            <p>Mati: {backendData[0].Mati}</p>
            <p>Oče: {backendData[0].Oce}</p>
            <label>Opombe:</label><br/>
            <input name="opombe"></input>
        </form>
        </>
    )
}