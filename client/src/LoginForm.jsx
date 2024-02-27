function LoginForm(){
    return(
        <>
            <form method="POST" action={import.meta.env.VITE_API+"/login"}><br/>
                    <input type="text" name="KMGMID" placeholder="KMGMID"/><br/>
                    <input type="password" name="password" placeholder="Geslo"/><br/>
                    <input type="submit"/>
            </form>
            <br/>Še nimaš računa?<br/>
            <a href={import.meta.env.VITE_SITE+"/register"}>Ustvari račun</a><br/><br/>
            <a href={import.meta.env.VITE_SITE+"/reset"}>Pozabljeno geslo</a>
        </>
    );
}
export default LoginForm;