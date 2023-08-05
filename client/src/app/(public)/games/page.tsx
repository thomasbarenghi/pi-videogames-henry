import { GamesGrid } from "@/components";
import styles from "./page.module.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PI Videogames | Games",
  description: "PI Videogames | Games",
  themeColor: "#000000",
};

export default function Games() {
  return (
    <>
      <section id={styles["hero"]} className="padding-lr-t2 py-14">
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
      <section className="padding-t1 !py-[75px] ">
        <GamesGrid />
      </section>
    </>
  );
}
