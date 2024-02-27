import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'

function ResetPass() {
    let { token } = useParams()
    console.log(token);
    const handleChange = (e) => {
        if (document.getElementsByName("pass")[0].value != document.getElementsByName("confirmPass")[0].value)
            document.getElementById("wrong").innerHTML = "Gesli se ne ujemata";
        else
            document.getElementById("wrong").innerHTML = "";

    }
    function handleSubmit() {
        if (document.getElementsByName("pass")[0].value == document.getElementsByName("confirmPass")[0].value)
            fetch(import.meta.env.VITE_API + "/resetPass");
    }
    useState
    useEffect(() => {
        fetch(import.meta.env.VITE_API + "/users", { method: "POST", body: { "token": token } }).then(()=>{
            
            response => response.json()
        }
        ).then(() => {
            
            data=>{
                
            
        }})
    }, []);
    if (response == "1") {
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