function LoginForm(){
    return(
        <>
            <form method="POST" action="http://localhost:5000/login"><br/>
                    <input type="text" name="KMGMID" placeholder="KMGMID"/><br/>
                    <input type="password" name="password" placeholder="Geslo"/><br/>
                    <input type="submit"/>
            </form>
        </>
    );
}
export default LoginForm;