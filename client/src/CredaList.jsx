import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import {
  Link,
  useParams
} from "react-router-dom";
export default function Details(props) {
  let { ID } = useParams()
  console.log("ID="+ID)
  const [backendData, setBackendData] = useState([{}]);
  console.log(ID);
  let neki;
  let server = "http://localhost:5000/";
  let body={credaID:ID}
  const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', Cookies.get("token"));
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  useEffect(() => {
    fetch(server+"creda",options).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
        console.log("AA"+backendData[0].ZivalID)
      }
    )
    setBackendData([{ZivalID:2001,SPOL:'M'}]);
  }, []);
  backendData.forEach((element)=>{if(element.SPOL=='Z')element.SPOL='Ženski';else{element.SPOL="Moški"}})
  return (
    
    <div>
      <h1>Čreda</h1>
      Išči po ušesni številki: <input type="text" id="search"onChange={()=>{
        let a=document.getElementsByClassName('zival');
        for(let i=0;i<a.length;i++){
          if(!a[i].id.includes(document.getElementById("search").value))
            a[i].style.display="none";
          else
            a[i].style.display="inline-block";
        }
      }}/><br/>
      {(backendData.map((item) => (
      <Link to={`/${item.ZivalID}`}>
        <div className='zival' id={item.ZivalID}>
          <img src="/image.png" alt="Slika zivali" className='zivalImg'></img>
          <b>{item.ZivalID}</b>
          <p>{item.SPOL}</p>
          <p>{(new Date(item.DatumRojstva * 1000)).toLocaleDateString()}</p>
        </div>
        </Link>
      )))}
    </div>
    
    
  );
}
