'use client'
import { type ReactNode, useEffect } from 'react'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hooks'
import { getGames, getGameById } from '@/redux/slices/client/games'

interface Props {
  children: ReactNode
}

const Querier = ({ children }: Props) => {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (pathname === '/games') {
      dispatch(getGames())
    }

    if (params?.gameId) {
      dispatch(getGameById(params?.gameId.toString()))
    }
  }, [pathname, dispatch, params.gameId, router])

  return <div>{children}</div>
}

export default Querier
