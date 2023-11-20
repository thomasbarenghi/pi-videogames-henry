'use client'
import { ReactSVG } from 'react-svg'

interface ModalProps {
  children: React.ReactNode
  setVisible: (status: boolean) => void
  visible: boolean
}

const Modal = ({ children, setVisible, visible }: ModalProps) => (
  <>
    {visible && (
      <section className='modalContainerBase'>
        <div className='modalInner'>{children}</div>
        <ReactSVG
          className='modalCloseBtn'
          src='img/fi-rr-cross.svg'
          width={15}
          height={15}
          onClick={() => {
            setVisible(false)
          }}
        />
      </section>
    )}
  </>
)

export default Modal
