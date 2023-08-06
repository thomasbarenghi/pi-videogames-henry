import styles from "./page.module.scss";
import { Button } from "@/components";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PI Videogames | Inicio",
  description: "PI Videogames | Inicio",
  themeColor: "#000000",
};

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="PI Videogames | Home" />
        <meta name="theme-color" content="#000" />
        <title>PI Videogames | Home</title>
      </Head>
      <section id={styles["hero"]} className="padding-lr-t2">
        <div id={styles["hero_contents"]}>
          <h1
            id={styles["contents_h1"]}
            className="display1-regular margin-b-16"
          >
            Conviértete en el mejor, <br />
            <strong>juega con amigos.</strong>
            <br />
          </h1>
          <p className="margin-b-24 body-regular w-full lg:max-w-[45%] ">
            ¿Listo para sumergirte en un mundo de videojuegos emocionante y
            diverso? En nuestra plataforma encontrarás una selección de los
            mejores títulos para todas las plataformas y géneros.
            <br />
          </p>
          <div className="flex gap-3">
            <Button
              className="primaryButton"
              type="button"
              text="Ingresa ahora"
              link={"/games"}
            />
            <Button
              className="secondaryButton"
              type="button"
              text="Conocenos"
              link={"/about"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
