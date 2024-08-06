import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import {
    Link,
    useParams
} from "react-router-dom";
function Creda() {
    let server = import.meta.env.VITE_API;
    const options = {
        method: 'POST',
        headers: { 'Authorization': Cookies.get("token") }
    };
    if(Cookies.get("token")== undefined){
        window.location.href = "/";
      }
    const AddCreda = function () {
        let server = import.meta.env.VITE_API+"/addCreda";
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
            window.location.href = "/crede";
        };
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };
        return (
            <div className='addDiv'>
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
          <img  class="position-fixed bottom-0 end-0 m-3 img-fluid" src="/src/plus.png" id="add" onClick={() => setShown(!isShown)}></img>
          </>
        );
      }
    const [backendData, setBackendData] = useState([{}]);
    const [details, setDetails] = useState([{}]);
    useEffect(() => {
        fetch(server + "/credaList", options).then(
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
                <Link to={`/crede/${item.CredaID}`}>
                    <div className='creda btn btn-secondary mt-2 ms-2' id={item.ImeCrede}>
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