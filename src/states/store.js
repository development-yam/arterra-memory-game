import { init } from '@rematch/core'
import { game } from './models/game'
import { level } from './models/level'

export const store = init({
  models: { game, level },
})
