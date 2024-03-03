function RegistrationForm() {
    return (
        <>
            <form method="POST" action={import.meta.env.VITE_API + "/register"} className="border rounded border-success w-50 m-auto p-5 mt-5 bg-light"><br />
                <label for="KMGMID" className="d-flex justify-content-center lead text-left form-label">KMGMID:</label><br />
                <input type="text" name="KMGMID" className="d-flex justify-content-center m-auto form-control-sm" /><br />
                <label for="username" className="d-flex justify-content-center lead text-left form-label">Elektronski naslov:</label>
                <input type="text" name="username" className="d-flex justify-content-center m-auto form-control-sm" /><br />
                <label for="password" className="d-flex justify-content-center lead text-left form-label">Geslo:</label><br />
                <input type="password" name="password" className="d-flex justify-content-center m-auto form-control-sm" /><br />
                <input type="submit" className="d-flex justify-content-center m-auto btn btn-success mb-3" value="Ustvari račun"/>
                <br /><p className="d-flex justify-content-center m-auto">Že imaš račun?</p><br />
                <a href={import.meta.env.VITE_SITE + "/"} className="d-flex justify-content-center m-auto">Prijavi se</a><br />
            </form >
        </>
    );
}
export default RegistrationForm;