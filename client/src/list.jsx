import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
export default function List() {
    const [backendData, setBackendData] = useState([{}]);
    
    useEffect(() => {
      fetch(`http://localhost:5000/list`).then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data);
        }
      )
      setBackendData([{ZivalID:2001,SPOL:'M'}]);
    }, []);
    console.log(backendData);
    backendData.forEach((element)=>{if(element.SPOL=='Z')element.SPOL='Ženski';else{element.SPOL="Moški"}})
    return (
      
      <div>
        <h1>Seznam živali</h1>
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
            <img src="./image.png" alt="Slika zivali" className='zivalImg'></img>
            <b>{item.ZivalID}</b>
            <p>{item.SPOL}</p>
            <p>{(new Date(item.DatumRojstva * 1000)).toLocaleDateString()}</p>
          </div>
          </Link>
        )))}
        
      </div>
      
    );
  };