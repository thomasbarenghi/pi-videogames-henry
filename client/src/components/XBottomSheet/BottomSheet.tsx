import styles from './modal.module.scss'
import { useEffect, useRef, useState } from 'react'

interface ModalProps {
  children: React.ReactNode
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}

const BottomSheet = ({ children, openModal, setOpenModal }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [modalManager, setModalManager] = useState(false)

  useEffect(() => {
    if (openModal) {
      setModalManager(true)
    }
  }, [openModal])

  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalManager(false)
      setOpenModal(false)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [modalRef, setOpenModal])

  return (
    <>
      {modalManager && (
        <div id={styles.filtersModalBox} ref={modalRef}>
          {children}
        </div>
      )}
    </>
  )
}

export default BottomSheet
