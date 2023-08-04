import styles from "./modal.module.scss";
import { useEffect, useRef, useState } from "react";

export default function Modal({ children, openModal, setOpenModal }: any) {
  const modalRef = useRef<HTMLDivElement>(null); // Add type annotation to specify the type of the ref
  const [modalManager, setModalManager] = useState(false);

  useEffect(() => {
    if (openModal) {
      setModalManager(true);
    }
  }, [openModal]);

  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalManager(false);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [modalRef, setOpenModal]);

  return (
    <>
      {modalManager && (
        <div id={styles["filtersModalBox"]} ref={modalRef}>
          {children}
        </div>
      )}
    </>
  );
}
