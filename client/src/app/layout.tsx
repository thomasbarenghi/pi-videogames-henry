import './globals.scss'
import React from 'react'
import Provider from '@/context/providers/redux.provider'

interface Props {
  children: React.ReactNode
}

const RootLayout = (props: Props) => (
  <html lang='es'>
    <head />
    <body className=''>
      <Provider>{props.children}</Provider>
    </body>
  </html>
)

export default RootLayout
