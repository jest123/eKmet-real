function LoginForm(){
    console.log(import.meta.env.VITE_API)
    return(
        <>
            <form method="POST" action={import.meta.env.VITE_API+"/login"}><br/>
                    <input type="text" name="KMGMID" placeholder="KMGMID"/><br/>
                    <input type="password" name="password" placeholder="Geslo"/><br/>
                    <input type="submit"/>
            </form>
        </>
    );
}
export default LoginForm;