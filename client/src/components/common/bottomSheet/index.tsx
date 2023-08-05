import styles from "./modal.module.scss";
import { useEffect, useRef, useState } from "react";

type ModalProps = {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export default function BottomSheet({
  children,
  openModal,
  setOpenModal,
}: ModalProps) {
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
