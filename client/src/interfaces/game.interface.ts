import { type Genre, type Platform } from '.'

export interface Game {
  id: string
  name: string
  source: 'public' | 'local'
  rating: number
  background_image: string
  genres: Genre[]
  platforms: Platform[]
  description?: string
  released?: string
}
