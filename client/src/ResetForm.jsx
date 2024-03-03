function ResetForm(){
    return(
        <>
            <form method="POST" action={import.meta.env.VITE_API + "/reset"} className="border rounded border-success w-50 m-auto p-5 mt-5 bg-light">
                <label for="email" className="d-flex justify-content-center lead text-left form-label">Elektronski naslov:</label>
                <input type="text" name="email" className="d-flex justify-content-center m-auto form-control-sm" /><br />
                <input type="submit" className="d-flex justify-content-center m-auto btn btn-success mb-3" value="Ponastavi geslo"/>
            
            </form>
        </>
    );
}
export default ResetForm;