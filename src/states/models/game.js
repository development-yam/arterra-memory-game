import { shuffle } from 'lodash'
import images from '../../utils/loadCards.js'

const init = {
  currentId: null,
  cards: [],
  openCards: [-1, -1],
  cardsOpened: 0,
  successCards: new Set(),
  success: 0,
  score: 0,
  bestScore: 0,
  gameCompleted: false,
}

export const game = {
  state: init,
  reducers: {
    reset(_, payload) {
      const usedImages = shuffle(images).slice(0, Math.pow(payload, 2) / 2)
      const cards = []
      
      // Create pairs with different images
      usedImages.forEach(img => {
        cards.push({ id: img.id, name: img.name + '-p1', src: img.src })
        cards.push({ id: img.id, name: img.name + '-p2', src: img.pairSrc })
      })

      // Shuffle the cards
      const shuffledCards = shuffle(cards)

      return {
        ...init,
        cards: shuffledCards,
        cardsOpened: 0,
        successCards: new Set(),
        gameCompleted: false,
      }
    },
    open(state, payload) {
      let { currentId, openCards, cardsOpened, successCards, success } = state

      if (payload.i === openCards[0]) {
        return state
      }

      if (payload.i === openCards[1]) {
        return state
      }

      if (successCards.has(payload.id)) {
        return state
      }

      if (openCards[0] < 0) {
        currentId = payload.id
        openCards = [payload.i, -1]
        cardsOpened++

        return { ...state, currentId, openCards, cardsOpened }
      }

      if (openCards[0] >= 0 && openCards[1] < 0) {
        openCards[1] = payload.i
        cardsOpened++

        if (payload.id === currentId) {
          cardsOpened = 0
          successCards.add(payload.id)
          success++
        }

        const gameCompleted = successCards.size === state.cards.length / 2

        return {
          ...state,
          openCards,
          cardsOpened,
          successCards,
          success,
          gameCompleted,
        }
      }

      return state
    },
    hide(state) {
      return { ...state, openCards: [-1, -1] }
    },
  },
}
