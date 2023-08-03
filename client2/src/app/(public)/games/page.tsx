import { GamesGrid } from "@/components";
import styles from "./page.module.scss";
import Head from "next/head";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PI Videogames | Games",
  description: "PI Videogames | Games",
};

export default function Games() {
  return (
    <>
      <Head>
        <title>PI Videogames | Games</title>
        <meta name="description" content="PI Videogames | Home" />
        <meta name="theme-color" content="#000" />
      </Head>
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
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad
              minim
              <br />
            </p>
          </div>
        </div>
      </section>
      <section className="padding-t1">
        <GamesGrid />
      </section>
    </>
  );
}
