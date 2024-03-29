'use client'
import Link from 'next/link'
import styles from './gameCard.module.scss'
import { deleteGame } from '@/redux/slices/client/games'
import { useAppDispatch } from '@/redux/hooks'
import Image from 'next/image'
import { type Game } from '@/interfaces'

interface GameCardProps {
  game: Game
}

const GameCard = ({ game }: GameCardProps) => {
  const dispatch = useAppDispatch()

  return (
    <div style={{ position: 'relative' }}>
      {game.source === 'local' && (
        <button
          className='primaryButton py-2 px-3 absolute top-0 right-0 z-[2] '
          onClick={async () => await dispatch(deleteGame(game.id))}
        >
          Delete
        </button>
      )}
      <Link href={`/games/${game.id}`}>
        <div id={styles.componente_cardGames}>
          <div id={styles.cardGames_image_div}>
            <Image
              id={styles.cardGames_img}
              src={game.background_image || '/img/Frame 1000002335.webp'}
              alt='imagen'
              fill
              onError={(e: any) => {
                e.target.onerror = null
                e.target.src = '/img/Frame 1000002335.webp'
              }}
            />
          </div>
          <div id={styles.cardGames_contents}>
            <h1 id={styles.contents_titulo} className='titulo3-bold margin-b-0'>
              {game.name}
            </h1>
            <div id={styles.contents_generos}>
              <Image className='mt-1' src='img/fi-br-playing-cards.svg' alt='icono' width={20} height={20} />
              <p id={styles.generos_text} className='body-regular'>
                {Array.isArray(game?.genres) && game.genres?.map((genre) => <span key={genre.id}>{genre.name} </span>)}
                <br />
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GameCard
