export default function ErrorWhite({error}) {
    return (
        <section
            style={{
                minHeight: "150x",
                background: "#ffffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
            }}
        >
            <h3 className="titulo3-bold" style={{color:"red"}}>Algo salio mal {error}</h3>
        </section>
    )
}