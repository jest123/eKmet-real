import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function List() {

  const [backendData, setBackendData] = useState([{}]);

  let server = import.meta.env.VITE_API;

  const options = {
    method: 'POST',
    headers: { 'Authorization': Cookies.get("token") }
  };
  if(Cookies.get("token")== undefined){
    window.location.href = "/";
  }
  useEffect(() => {
    fetch(server + "/list", options).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
    setBackendData([{ ZivalID: 2001, SPOL: 'M' }]);
  }, []);
  const ImageComponent = ({ ZivalID }) => {
    const [tempData, setTempData] = useState({ imageURI: '' });

    useEffect(() => {
      fetch(server + "/image?ID=" + ZivalID, options)
        .then(response => response.json())
        .then(data => {
          setTempData(data);
        });
    }, [server, options, ZivalID]);
    console.log(tempData.imageURI)
    if(tempData.imageURI==undefined)
      return <img src="./public/image.png" alt="Slika zivali" className='zivalImg' />;
    return <img src={tempData.imageURI} alt="Slika zivali" className='zivalImg' />;
  };
  backendData.forEach((element) => { if (element.SPOL == 'Z') element.SPOL = 'Ženski'; else { element.SPOL = "Moški" } })
  return (

    <div>
      <h1>Seznam živali</h1>
      Išči po ušesni številki: <input type="text" id="search" onChange={() => {
        let a = document.getElementsByClassName('zival');
        for (let i = 0; i < a.length; i++) {
          if (!a[i].id.includes(document.getElementById("search").value))
            a[i].style.display = "none";
          else
            a[i].style.display = "inline-block";
        }
      }} /><br />
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
    </div>


  );
};