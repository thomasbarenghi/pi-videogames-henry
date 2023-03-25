export default function errorBlack( {error} ) {
    return (
        <section
            style={{
                minHeight: "100vh",
                background: "#000000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
            }}
        >
            <h3 className="titulo3-bold" style={{color:"white"}}>Algo salio mal {error}</h3>
        </section>
    )
}