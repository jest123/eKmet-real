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
  let server = import.meta.env.VITE_API;
  let body={credaID:ID}
  const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', Cookies.get("token"));
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  if(Cookies.get("token")== undefined){
    window.location.href = "/";
  }
  const ImageComponent = ({ ZivalID }) => {
    const [tempData, setTempData] = useState({ imageURI: '' });

    useEffect(() => {
      fetch(server + "/image?ID=" + ZivalID, options)
        .then(response => response.json())
        .then(data => {
          setTempData(data);
        });
    }, [server, options, ZivalID]);
    if(tempData.imageURI==undefined)
      return <img src="./public/image.png" alt="Slika zivali" className='zivalImg' />;
    return <img src={tempData.imageURI} alt="Slika zivali" className='zivalImg' />;
  };
  useEffect(() => {
    fetch(server+"/creda",options).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
        console.log("AA"+backendData[0].ZivalID)
      }
    )
    setBackendData([{ZivalID:2001,SPOL:'M'}]);
  }, []);
  const deleteCreda = async () => {
    let body={credaID:ID}
    const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', Cookies.get("token"));
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    };
    try {
      console.log("AAAA"+options.body.ZivalID);
      const response = await fetch(server+"/deleteCreda",options);
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.href = "/crede";
  }
  backendData.forEach((element)=>{if(element.SPOL=='Z')element.SPOL='Ženski';else{element.SPOL="Moški"}})
  return (
    
    <div>
      <h1></h1>
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
        <ImageComponent ZivalID={item.ZivalID} />
          <b>{item.ZivalID}</b>
          <p>{item.SPOL}</p>
          <p>{(new Date(item.DatumRojstva * 1000)).toLocaleDateString()}</p>
        </div>
        </Link>
      )))}
      <button className="position-fixed bottom-0 end-0 m-3 btn btn-danger" onClick={deleteCreda}>Izbriši čredo</button>
    </div>
    
    
  );
}
