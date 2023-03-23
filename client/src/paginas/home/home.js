import styles from "./home.module.scss"
import Helmet from "react-helmet"
import Button from "../../componentes/general/button/button"

export default function Home() {
    return (
        <>
            <Helmet>
                <title>PI Videogames | Home</title>
                <meta name="theme-color" content="#000" />
            </Helmet>
            <section id={styles["hero"]} className="padding-lr-t2">
                <div id={styles["hero_contents"]}>
                    <h1 id={styles["contents_h1"]} className="display1-regular margin-b-16">
                        Conviértete en el mejor, <br />
                        <strong>juega con amigos.</strong>
                        <br />
                    </h1>
                    <p id={styles["contents_p"]} className="margin-b-24 body-regular span-100">
                        ¿Listo para sumergirte en un mundo de videojuegos emocionante y diverso?
                        En nuestra plataforma encontrarás una selección de los mejores títulos
                        para todas las plataformas y géneros.
                        <br />
                    </p>
                    <div id={styles["hero_botonera"]}>
                        <Button className="btn1 btn1-t1" type="button" text="Ingresa ahora" link={"/games"} />
                        <Button className="btn1 btn1-t2" type="button" text="Conocenos" id={styles["botonera_btn2"]} link={"/about"} />
                    </div>
                </div>
            </section>
        </>
    )
}