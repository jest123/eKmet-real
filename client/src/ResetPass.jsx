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
            });
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
    console.log(res)
    if (res == true) {
        return (
            <form onSubmit={handleSubmit}>
                <input type="text" name="pass" placeholder="Vnesi geslo" onChange={handleChange}></input><br />
                <input type="text" name="confirmPass" placeholder="Vnesi geslo" onChange={handleChange}></input><br />
                <p id="wrong"></p>
                <input type="submit"></input>
            </form>
        );
    }
    else {
        return (<h1>Napaka</h1>);
    }
}
export default ResetPass;