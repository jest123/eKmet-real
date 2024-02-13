import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import {
    Link,
    useParams
} from "react-router-dom";
function Creda() {
    let server = "http://localhost:5000/";
    const options = {
        method: 'POST',
        headers: { 'Authorization': Cookies.get("token") }
    };
    const AddCreda = function () {
        let server = "http://localhost:5000/addCreda";
        const [formData, setFormData] = useState({
            ImeCrede: '',
            Opombe: '',
        });
        const handleSubmit = async (e) => {
            e.preventDefault();
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', Cookies.get("token"));
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData),
            }
            try {
                console.log("AAAA" + options.body.ZivalID);
                const response = await fetch(server, options);
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
        return (
            <div className='addDiv'>
                <img src='./public/exit.png' id="exit" onClick={() => { document.getElementById("root").removeChild(document.getElementsByClassName("addDiv")[0]); }}></img>
                <form method='POST' onSubmit={handleSubmit}>
                    <label >Ime črede:</label><br />
                    <input name="ImeCrede" placeholder='Ime črede' value={formData.ImeCrede} onChange={handleChange} required></input><br />
                    <label >Opombe:</label><br />
                    <input name="Opombe" placeholder='Opombe' value={formData.Opombe} onChange={handleChange} required></input><br />
                    <input type="submit"></input>
                </form>
            </div>
        );
    }
    const AddButton= function(){
        const [isShown, setShown] = useState(false);  
        return (
          <>
          {isShown ? <AddCreda /> : null}
          <img src="/src/plus.png" id="add" onClick={() => setShown(!isShown)}></img>
          </>
        );
      }
    const [backendData, setBackendData] = useState([{}]);
    const [details, setDetails] = useState([{}]);
    useEffect(() => {
        fetch(server + "credaList", options).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
            }
        )
    }, []);
    useEffect(() => {
        fetch(server + "credaList", options).then(
            response => response.json()
        ).then(
            data => {
                setDetails(data);
            }
        )
    }, []);
    return (
        <>
            {(backendData.map((item) => (
                <Link to={`/creda/${item.credaid}`}>
                    <div className='creda' id={item.ImeCrede}>
                        <b>{item.ImeCrede}</b>
                        <p>{item.Opombe}</p>
                    </div>
                </Link>
            )))}
            <AddButton/>
        </>
    )
}
export default Creda;