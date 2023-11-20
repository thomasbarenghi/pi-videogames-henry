import Link from 'next/link'
import { Routes } from '@/utils/constants/routes.const'

interface Props {
  style?: React.CSSProperties
  classname?: string
  mode?: 'horizontal' | 'vertical'
  actionClick?: () => void
}

const Nav = ({ style, classname, mode = 'horizontal', actionClick }: Props) => (
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
)

export default Nav
