import styles from "./footer.module.scss"

export default function Footer() {

    return (
        <footer id={styles["footer"]} className="padding-lr-t1">
            <p className="body-regular margin-b-0" style={{ textAlign: "center" }}>
                PI Video Games | Diseñado y desarrollado por Thomas Barenghi |
                thomasbarenghi@gmail.com
                <br />
            </p>
        </footer>
    )
}