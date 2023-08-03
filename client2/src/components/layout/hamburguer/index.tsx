import { Nav } from "@/components";
import styles from "./hamburguer.module.scss";
import Image from "next/image";

type HamburguerProps = {
  manageHamburguer: (data: boolean) => void;
};

export default function Hamburguer({ manageHamburguer }: HamburguerProps) {
  return (
    <div
      id={styles["hamburguer-menu"]}
      className="padding-lr-t1"
      style={{ backdropFilter: "blur(26px)" }}
    >
      <Image
        id={styles["closeMenu"]}
        src="/img/fi-br-cross.svg"
        width={24}
        height={24}
        onClick={() => manageHamburguer(false)}
        alt="close"
      />
      <div id={styles["hamburguer-box"]}>
        <p className="margin-b-16 body-regular">Menu</p>
        <div className="margin-b-24" style={{ width: "100%" }}>
          <ul
            id={styles["nav-hamb"]}
            className="titulo1-regular"
            style={{ listStyle: "none", width: "100%" }}
          >
            <Nav />
          </ul>
        </div>
        <p className="body-regular">Ponte en contacto</p>
        <span className="body-regular">thomasbarenghi@gmail.com</span>
      </div>
    </div>
  );
}
