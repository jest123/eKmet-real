import React, { useEffect, useState, useRef } from 'react'
import Cookies from 'js-cookie';
import {
  Link,
  useParams
} from "react-router-dom";
export default function Details(props) {
  let selectedFile;
  let { ID } = useParams()
  const [backendData, setBackendData] = useState([{}]);
  const [credaData, setCredaData] = useState([{}]);
  console.log(ID);
  let neki;
  let server = import.meta.env.VITE_API;
  const options = {
    method: 'POST',
    headers: { 'Authorization': Cookies.get("token") }
  };
  const [formData, setFormData] = useState({
    zivalID: '',
    spol: '',
    pasma: '',
    datumRojstva: '',
    oce: '',
    mati: '',
    ime: '',
    opombe: '',
    credaID: '',
    slika:''
  });
  useEffect(() => {
    fetch(server + "/details?ID=" + ID, options).then(
      response => response.json()
    ).then(
      data => {
        let x=data
        console.log("MMM"+x);
        neki = {
          zivalID: data.data[0].ZivalID,
          spol: data.data[0].SPOL,
          pasma: data.data[0].Pasma,
          datumRojstva: (new Date(data.data[0].DatumRojstva * 1000)).toLocaleDateString(),
          oce: data.data[0].Oce,
          mati: data.data[0].Mati,
          ime: data.data[0].Ime,
          opombe: data.data[0].Opombe,
          credaID: data.data[0].credaID,
          slika:data.imageURI
        };
        console.log("AAA" + neki.credaID)
        setFormData(neki);
      }
    )
  }, []);
  useEffect(() => {
    fetch(server + "/credaList", options).then(
      response => response.json()
    ).then(
      data => {
        setCredaData(data);
      }
    )
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append('Authorization', Cookies.get("token"));
    const formDataa = new FormData()
    formDataa.append('data',JSON.stringify({zivalID: formData.zivalID,
    spol: formData.spol,
    pasma: formData.pasma,
    datumRojstva: formData.datumRojstva,
    oce: formData.oce,
    mati: formData.mati,
    ime: formData.ime,
    opombe: formData.opombe,
    credaID: formData.credaID}));
    formDataa.append('img',selectedFile);
    for (const key of formDataa.keys()) {
      console.log(key);
    }
    let a =(formDataa.get("data"));
    console.log(JSON.parse(a).zivalID)
    const options = {
      method: 'POST',
      headers: headers,
      body: formDataa,
    }
    try {
      console.log("AAAA" + options.body.ZivalID);
      const response = await fetch(server + "/update", options);
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    selectedFile = e.target.files[0];
    document.getElementById("img").src = URL.createObjectURL(selectedFile)
  };
  return (
    <>
      <form onSubmit={handleSubmit} method='POST' enctype="multipart/form-data">
        <Link to="/list"><button>Nazaj</button></Link>
        {formData.slika==undefined ? 
        <img
        id='img'
          src="./public/image.png"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
          onerror="this.src='./public/image.png';"
        />
        :<img
        id='img'
          src={formData.slika}
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
          onerror="this.src='./public/image.png';"
        />}
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <h3>Ušesna številka:<br /> {formData.zivalID}</h3>
        <label>Spol: </label><br />
        <select name="spol" value={formData.spol} onChange={handleChange}>
          <option value='Z'>Z</option>
          <option value='M'>M</option>
        </select><br />
        <label>Datum rojstva: </label><br />
        <input name='datumRojstva' value={formData.datumRojstva} onChange={handleChange}></input><br />
        <label>Pasma: </label><br />
        <input name='pasma' value={formData.pasma} onChange={handleChange}></input><br />
        <label>Ime: </label><br />
        <input name='ime' value={formData.ime} onChange={handleChange}></input><br />
        <label>Mati: </label><br />
        <input name="mati" value={formData.mati} onChange={handleChange}></input><br />
        <label>Oče: </label><br />
        <input name="oce" value={formData.oce} onChange={handleChange}></input><br />
        <label>Čreda:</label><br />
        <select name='credaID' value={formData.credaID} onChange={handleChange}>
          <option value=''></option>
          {(credaData.map((item) => (
            <option value={item.CredaID}>{item.ImeCrede}</option>
          )))}
        </select><br />
        <label>Opombe:</label><br />
        <input name="opombe" value={formData.opombe} onChange={handleChange}></input> <br />
        <input type="submit"></input>
      </form>
    </>
  )
}