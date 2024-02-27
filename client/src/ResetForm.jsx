function ResetForm(){
    return(
        <>
            <form method="POST" action={import.meta.env.VITE_API+"/reset"}><br/>
                    <input type="text" name="email" placeholder="email"/><br/>
                    <input type="submit"/>
            </form>
        </>
    );
}
export default ResetForm;