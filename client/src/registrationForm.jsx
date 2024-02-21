function RegistrationForm(){
    return(
        <>
            <form method="POST" action={import.meta.env.VITE_API+"/register"}><br/>
                    <input type="text" name="KMGMID" placeholder="KMGMID"/><br/>
                    <input type="text" name="username" placeholder="Elektronski naslov"/><br/>
                    <input type="password" name="password" placeholder="Geslo"/><br/>
                    <input type="submit"/>
            </form>
        </>
    );
}
export default RegistrationForm;