import { ReactSVG } from 'react-svg'

type ModalProps = {
  children: React.ReactNode
  setVisible: (status: boolean) => void
  visible: boolean
}

export default function Modal({ children, setVisible, visible }: ModalProps) {
  return (
    <>
      {visible && (
        <section className='modalContainerBase'>
          <div className='modalInner'>{children}</div>
          <ReactSVG
            className='modalCloseBtn'
            src='img/fi-rr-cross.svg'
            width={15}
            height={15}
            onClick={() => setVisible(false)}
          />
        </section>
      )}
    </>
  )
}
