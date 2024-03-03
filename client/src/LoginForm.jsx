function LoginForm() {
    return (
        <div className="border rounded border-success w-50 m-auto p-5 mt-5 bg-light">
            <form method="POST" action={import.meta.env.VITE_API + "/login"}>
                <label for="KMGMID" className="d-flex justify-content-center lead text-left form-label">KMGMID:</label>
                <input type="text" name="KMGMID" className="d-flex justify-content-center m-auto form-control-sm" />
                <label for="password" className="d-flex justify-content-center lead text-left form-label">Geslo:</label>
                <input type="password" name="password" className="d-flex justify-content-center m-auto form-control-sm"/><br/>
                <input type="submit" className="d-flex justify-content-center m-auto btn btn-success mb-3" value="Prijava"/>
            </form>
            <p className="d-flex justify-content-center m-auto">Še nimaš računa?</p>
            <a href={import.meta.env.VITE_SITE + "/register"} className="d-flex justify-content-center m-auto">Ustvari račun</a><br />
            <a href={import.meta.env.VITE_SITE + "/reset"} className="d-flex justify-content-center m-auto">Pozabljeno geslo</a>
        </div>
    );
}
export default LoginForm;