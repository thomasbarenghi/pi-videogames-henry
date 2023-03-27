import React, { useState, useEffect } from 'react'
import styles from "./header.module.scss"
import { Link } from "react-router-dom"
import Nav from '../nav/nav';
import Hamburguer from '../hamburguer/hamburguer';
import Button from '../../general/button/button';

export const manageHamburguer = (data) => {
    Header.handleHamburguer();
}

export default function Header() {

    const [hamburguer, setHamburguer] = useState(false);
    const [headerType, setHeaderType] = useState("default");
    const handleHamburguer = (data) => { setHamburguer(data); }
    Header.handleHamburguer = handleHamburguer;

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
        <header id={styles["header"]} className="padding-lr-t1" style={headerType === "alternative" && !hamburguer ? { background: "#B9000094", backdropFilter: "blur(3px)" } : {}}>
            <Link to="/">
                <img id={styles["header_logo"]} src="/img/gamingXLogo.svg" alt="logo" />
            </Link>
            <ul id={styles["header_ul"]} className="margin-b-0 body-regular" >
                <Nav style={headerType === "alternative" ? { color: "#fff" } : {}} />
            </ul>
            <div>
                <img id={styles["openMenu"]} src="img/fi-br-apps.svg" alt="menu" onClick={() => handleHamburguer(true)} />
            </div>
            <Button text="Conocenos" id={styles["header_btn"]} type="button" className="btn1 btn1-t2" link={"/about"} ></Button>

            {hamburguer ? <Hamburguer /> : null}
        </header>
    )
}