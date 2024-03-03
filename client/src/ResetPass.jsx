import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'

function ResetPass() {
    const { token } = useParams()
    const [res, setResponse] = useState(true);
    console.log(token);
    const handleChange = (e) => {
        if (document.getElementsByName("pass")[0].value != document.getElementsByName("confirmPass")[0].value)
            document.getElementById("wrong").innerHTML = "Gesli se ne ujemata";
        else
            document.getElementById("wrong").innerHTML = "";

    }
    function handleSubmit() {
        if (document.getElementsByName("pass")[0].value == document.getElementsByName("confirmPass")[0].value)
            fetch(import.meta.env.VITE_API + "/resetPass",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    pass:document.getElementsByName("pass")[0].value,
                    token:token
                })
            })
        
    }
    useEffect(() => {
        fetch(import.meta.env.VITE_API + "/users?token="+token, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setResponse(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, [token]);
    
    if (res == true) {
        return (
            <form onSubmit={handleSubmit} className="border rounded border-success w-50 m-auto p-5 mt-5 bg-light">
                <label for="email" className="d-flex justify-content-center lead text-left form-label">Novo geslo:</label>
                <input type="password" name="pass" className="d-flex justify-content-center m-auto form-control-sm"  onChange={handleChange}/><br />
                <label for="email" className="d-flex justify-content-center lead text-left form-label">Potrdi geslo:</label>
                <input type="password" name="confirmPass" className="d-flex justify-content-center m-auto form-control-sm"  onChange={handleChange}/>
                <p id="wrong" className="d-flex justify-content-center m-auto text-danger"></p><br/>
                <input type="submit" value="Nastavi geslo" className="d-flex justify-content-center m-auto btn btn-success mb-3"></input>
            </form>
        );
    }
    else {
        return (<h1>Napaka</h1>);
    }
}
export default ResetPass;