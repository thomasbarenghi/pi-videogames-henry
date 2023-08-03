import styles from "./page.module.scss";
import { Tecnologias } from "@/data";
import Head from "next/head";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PI Videogames | About",
  description: "PI Videogames | About",
};

export default function About() {
  return (
    <>
      <section id={styles["seccion-hero"]} className="padding-t1">
        <div id={styles["div_hero"]}>
          <h1 className="titulo1-regular margin-b-0" style={{ paddingTop: 15 }}>
            Descubre los mejores juegos, <br />
            <strong>descubre GamingX</strong>
            <br />
          </h1>
          <p
            className="body-regular margin-b-0 span-100"
            style={{ width: "60%" }}
          >
            Explora una amplia variedad de juegos con GamingX, la plataforma que
            te brinda acceso a los mejores títulos del mercado.
            <br />
          </p>
        </div>
      </section>
      <section id={styles["seccion-descripcion-autor"]} className="padding-t1">
        <h1 className="titulo1-regular margin-b-8">
          Conozcámonos <strong>un poco más</strong> ❤️
          <br />
        </h1>
        <p className="margin-b-0 body-regular">
          Soy Thomas Barenghi, diseñador UX/UI y desarrollador web fullstack con
          20 años de edad. Resido en Buenos Aires y quiero estudiar Desarrollo
          de Software en UADE. Además, complemento mi formación en el bootcamp
          Soy Henry, donde adquiriré más de
          <strong> 800 horas de experiencia</strong> y desarrollaré proyectos
          prácticos. Me esfuerzo por combinar mis habilidades técnicas con mi
          pasión por la creatividad para crear soluciones digitales innovadoras
          y atractivas para el usuario.
          <br />
        </p>
      </section>
      <section id={styles["section_proyecto"]}>
        <div id={styles["seccion-descripcion-proyecto"]} className="padding-t1">
          <h1 className="titulo1-regular margin-b-8">
            Sobre la{" "}
            <strong>
              <span style={{ color: "rgb(255, 0, 0)" }}>aplicación</span>
            </strong>{" "}
            🚀🦾🤖
            <br />
          </h1>
          <p className="margin-b-0 body-regular">
            Bienvenido a GamingX, la plataforma en línea donde puedes descubrir
            los mejores juegos del mercado. En nuestra plataforma, encontrarás
            una amplia variedad de juegos de todos los géneros, desde los
            clásicos hasta los más nuevos e innovadores. Podrás explorar
            nuestros juegos, ver imágenes y obtener información detallada sobre
            ellos. En GamingX, estamos comprometidos en brindarte la mejor
            experiencia de juego en línea. ¡Únete a nuestra comunidad y descubre
            los mejores juegos de la mano de GamingX!
            <br />
          </p>
        </div>
        <div id={styles["proyecto_img"]} />
      </section>
      <section id={styles["seccion-tecnologias"]} className="padding-t1">
        <h1
          className="titulo1-regular margin-b-60 span-100"
          style={{ textAlign: "center" }}
        >
          Tecnologías <strong>utilizadas 😎</strong>
        </h1>
        <div id={styles["grid"]}>
          {Tecnologias.map((tecnologia, index) => (
            <div id={styles["item_tecnologias"]} key={index}>
              <div id={styles["titulo_icono"]}>
                <Image
                  src={tecnologia.imagen}
                  style={{ width: 50, height: 50 }}
                  width={50}
                  height={50}
                  alt="icono"
                />
                <h1 className="margin-b-0 titulo3-bold">{tecnologia.titulo}</h1>
              </div>
              <p className="body-regular color-body">
                {tecnologia.descripcion}
                <br />
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
