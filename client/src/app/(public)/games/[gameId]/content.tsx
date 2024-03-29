'use client'
import { useAppSelector } from '@/redux/hooks'
import styles from './page.module.scss'
import { Error, Loader } from '@/components'
import Image from 'next/image'

const GameDetailsContent = () => {
  const { isLoading, isError, currentGame } = useAppSelector((state) => state?.client?.games)

  if (isLoading) {
    return <Loader theme='dark' />
  }

  if (isError) {
    return <Error theme='dark' error='Error al cargar el juego' />
  }

  return (
    <section
      id={styles.hero}
      className='padding-lr-t1'
      style={{
        background: `url(${currentGame?.background_image}) top / contain repeat`
      }}
    >
      <div id={styles.hero_col1}>
        <div id={styles.col1_card1} className={styles['blured-red-box']}>
          <h1 id={styles.card1_title} className='margin-b-8 titulo2-bold'>
            {currentGame?.name}
            <br />
          </h1>
          <div
            id={styles.card1_desc}
            className='body-regular'
            dangerouslySetInnerHTML={{
              __html: currentGame?.description ?? ''
            }}
          />
        </div>
        <div id={styles.col1_card2} className={styles['blured-red-box']}>
          <p className='body-regular'>
            <strong>Plataformas: </strong>
            {Array.isArray(currentGame?.platforms) &&
              currentGame?.platforms.map((genre: any) => <span key={genre.id}>{genre.name} </span>)}
            <br />
          </p>
          <p className='body-regular'>
            <strong>Generos: </strong>
            {Array.isArray(currentGame?.genres) &&
              currentGame?.genres.map((genre: any) => <span key={genre.id}>{genre.name} </span>)}
          </p>
          <p className='body-regular'>
            <strong>Publicación: </strong>
            {currentGame?.released}
          </p>
          <p className='body-regular'>
            <strong>Rating: </strong>
            {currentGame?.rating}
            <br />
          </p>
        </div>
      </div>
      <div id={styles.hero_col2}>
        <div id={styles.col2_card_inner}>
          <div id={styles.col2_card_inner2}>
            <Image
              id={styles.inner_img}
              src={currentGame?.background_image ?? '/image/placeholder.png'}
              alt={currentGame?.name ?? 'null'}
              fill
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default GameDetailsContent
