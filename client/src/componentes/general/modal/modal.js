import styles from "./modal.module.scss";
import { useEffect, useRef, useState } from "react";

export default function Modal({ children, openModal, setOpenModal }) {
    const modalRef = useRef(null);
    const [modalManager, setModalManager] = useState(false)

    useEffect(() => { if (openModal) { setModalManager(true); } }, [openModal])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) { setModalManager(false); setOpenModal(false); }
        };
        document.body.addEventListener("click", handleOutsideClick);
        return () => { document.body.removeEventListener("click", handleOutsideClick); };
    }, [modalRef, setOpenModal]);

    return (<>{modalManager && <div id={styles["filtersModalBox"]} ref={modalRef}>{children}</div>}</>)
}