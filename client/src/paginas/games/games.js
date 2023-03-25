import GamesGrid from "../../componentes/project/gamesGrid/gamesGrid"
import styles from "./games.module.scss"
import { useEffect } from "react"


export default function Games() {

    useEffect(() => {
        document.title = 'PI Videogames | Games';
        const metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        metaThemeColor.setAttribute('content', '#000');
        document.head.appendChild(metaThemeColor);
        return () => {
            document.head.removeChild(metaThemeColor);
        };
    }, []);

    return (
        <>
            <section id={styles["hero"]} className="padding-lr-t2">
                <div id={styles["hero_contents"]}>
                    <div>
                        <h1
                            className="titulo1-regular margin-b-0"
                            style={{ lineHeight: "120%" }}
                        >
                            Encuentra tu juego <br />
                            favorito <strong>ahora!</strong>
                            <br />
                        </h1>
                    </div>
                    <div id={styles["contents_div_p"]}>
                        <p className="margin-b-0 body-regular">
                            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqut enim ad minim
                            <br />
                        </p>
                    </div>
                </div>
            </section>
            <section className="padding-t1">
                <GamesGrid />
            </section>
        </>
    )
}