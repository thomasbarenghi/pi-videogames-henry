import { Link } from "react-router-dom"

export default function Nav({ style }) {
    return (
        <>
            <li ><Link to="/" style={style}>Inicio</Link></li>
            <li ><Link to="/games" style={style} >Videojuegos</Link></li>
            <li ><Link to="/about" style={style} >Nosotros</Link></li>
        </>
    )
}