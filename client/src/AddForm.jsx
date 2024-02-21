import React, {useEffect,useState} from 'react'
import Cookies from 'js-cookie';

export default function AddForm(){
    let server=import.meta.env.VITE_API+"/add";
    const [formData, setFormData] = useState({
      ZivalID:'',
      spol:'',
      Pasma:'',
      DatumRojstva:'',
      Oce:'',
      Mati:'',
      Ime:''
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', Cookies.get("token"));
    const options={
      method: 'POST',
      headers: headers,
      body: JSON.stringify(formData),
    }
    try {
      console.log("AAAA"+options.body.ZivalID);
      const response = await fetch(server,options);
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    return(
      <div className='addDiv'>
          <img src='./public/exit.png' id="exit" onClick={() => {document.getElementById("root").removeChild(document.getElementsByClassName("addDiv")[0]);}}></img>
          <form method='POST' onSubmit={handleSubmit}>
              <label >Ušesna številka:</label><br/>
              <input name="ZivalID" placeholder='Ušesna številka' value={formData.ZivalID} onChange={handleChange} required></input><br/>
              <label >Spol:</label><br/>
              <select name="spol" size="1" value={formData.spol} onChange={handleChange} required>
                <option value="M">Moški</option>
                <option value="Z">Ženski</option>
              </select><br/>
              <label >Pasma:</label><br/>
              <input name="Pasma" placeholder='Pasma' value={formData.Pasma} onChange={handleChange}></input><br/>
              <label >Datum rojstva:</label><br/>
              <input name="DatumRojstva" type="date" value={formData.DatumRojstva} onChange={handleChange} required></input><br/>
              <label >Oče:</label><br/>
              <input name="Oce" value={formData.Oce} onChange={handleChange}></input><br/>
              <label >Mati:</label><br/>
              <input name="Mati" value={formData.Mati} onChange={handleChange}></input><br/>
              <label >Ime:</label><br/>
              <input name="Ime" value={formData.Ime} onChange={handleChange}></input><br/>
              <input type="submit"></input>
          </form>
      </div>
    );
  }