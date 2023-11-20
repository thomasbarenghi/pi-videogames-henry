import Link from 'next/link'
import { Routes } from '@/constants'

type Props = {
  style?: any
  classname?: string
  mode?: 'horizontal' | 'vertical'
  actionClick?: () => void
}

export default function Nav({ style, classname, mode = 'horizontal', actionClick }: Props) {
  return (
    <>
      <div className={`flex justify-between  ${mode === 'horizontal' ? 'gap-8' : 'flex-col gap-3'}`}>
        <Link href={Routes.HOME} style={style} className={classname} onClick={actionClick}>
          Inicio
        </Link>
        <Link href={Routes.GAMES} style={style} className={classname} onClick={actionClick}>
          Videojuegos
        </Link>
        <Link href={Routes.ABOUT} style={style} className={classname} onClick={actionClick}>
          Nosotros
        </Link>
      </div>
    </>
  )
}
