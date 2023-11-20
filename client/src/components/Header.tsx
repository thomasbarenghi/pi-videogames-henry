import { useState, useEffect } from 'react'
import { Routes } from '@/utils/constants/routes.const'
import { Button, Nav, Hamburguer } from '@/components'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const [hamburguer, setHamburguer] = useState(false)
  const [headerType, setHeaderType] = useState('default')

  const handleHamburguer = (data: boolean) => {
    setHamburguer(data)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderType('alternative')
      } else {
        setHeaderType('default')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      id='header1'
      className='padding-lr-t1'
      style={
        headerType === 'alternative' && !hamburguer ? { background: '#B9000094', backdropFilter: 'blur(3px)' } : {}
      }
    >
      <Link href='/'>
        <Image id='headerLogo' src='/img/gamingXLogo.svg' alt='logo' width={140} height={40} />
      </Link>
      <div className='hidden lg:flex absolute left-[50%]  translate-x-[-50%]'>
        <Nav style={headerType === 'alternative' ? { color: '#fff' } : {}} />
      </div>
      <div className='relative w-8 aspect-square cursor-pointer lg:hidden'>
        <Image
          src='/img/fi-br-apps.svg'
          alt='menu'
          fill
          onClick={() => {
            handleHamburguer(true)
          }}
        />
      </div>
      <Button text='Conocenos' type='button' className='secondaryButton hidden lg:flex' link={Routes.ABOUT} />
      {hamburguer ? <Hamburguer manageHamburguer={setHamburguer} /> : null}
    </header>
  )
}

export default Header
