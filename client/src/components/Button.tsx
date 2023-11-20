import Link from 'next/link'
import Image from 'next/image'

interface ButtonProps {
  text: string
  link?: string
  type: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  className: string
  disabled?: boolean
  style?: React.CSSProperties
  id?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
}

const Button = ({ text, link, type, onClick, className, disabled, style, id, image }: ButtonProps) => (
  <button className={className} type={type} onClick={onClick} disabled={disabled} style={style} id={id}>
    <Link href={link ?? ''}>
      {image && <Image src={image} className='min-w-[18px] min-h-[18px] h-full ' width={25} height={25} alt='image' />}
      {text}
    </Link>
  </button>
)

export default Button
