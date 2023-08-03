import { useState, useEffect } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { Button, Nav, Hamburguer } from "@/components";
import { Routes } from "@/constants";

export default function Header() {
  const [hamburguer, setHamburguer] = useState(false);
  const [headerType, setHeaderType] = useState("default");

  const handleHamburguer = (data: any) => {
    setHamburguer(data);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderType("alternative");
      } else {
        setHeaderType("default");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id={styles["header"]}
      className="padding-lr-t1"
      style={
        headerType === "alternative" && !hamburguer
          ? { background: "#B9000094", backdropFilter: "blur(3px)" }
          : {}
      }
    >
      <Link href="/">
        <img id={styles["header_logo"]} src="/img/gamingXLogo.svg" alt="logo" />
      </Link>
      <ul id={styles["header_ul"]} className="margin-b-0 body-regular">
        <Nav style={headerType === "alternative" ? { color: "#fff" } : {}} />
      </ul>
      <div>
        <img
          id={styles["openMenu"]}
          src="/img/fi-br-apps.svg"
          alt="menu"
          onClick={() => handleHamburguer(true)}
        />
      </div>
      <Button
        text="Conocenos"
        id={styles["header_btn"]}
        type="button"
        className="btn1 btn1-t2"
        link={Routes.ABOUT}
      ></Button>

      {hamburguer ? <Hamburguer manageHamburguer={setHamburguer} /> : null}
    </header>
  );
}
