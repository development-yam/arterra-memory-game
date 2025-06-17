import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSound from 'use-sound'
import ClickSfx from '../assets/sfx/click.wav'
import PairSfx from '../assets/sfx/pair.mp3'
import CardBackImg from '../assets/images/card-back.png'

const GameTable = ({ onEnd = () => {} }) => {
  const state = useSelector((state) => state.game)
  const { current } = useSelector((state) => state.level)

  const dispatch = useDispatch()

  const [playClick] = useSound(ClickSfx)
  const [playPair] = useSound(PairSfx)

  useEffect(() => {
    dispatch.game.reset(current)

    return () => {
      dispatch.game.reset(current)
    }
  }, [dispatch, current])

  useEffect(() => {
    let timeout

    if (state.openCards[0] >= 0 && state.openCards[1] >= 0) {
      if (state.cards[state.openCards[0]].id === state.cards[state.openCards[1]].id) {
        dispatch.game.hide()
      } else {
        timeout = setTimeout(dispatch.game.hide, 1000)
      }
    }

    return () => clearTimeout(timeout)
  }, [dispatch, state, playClick])

  useEffect(() => {
    if (state.cardsOpened) {
      playClick()
    }
  }, [state.cardsOpened, playClick])

  useEffect(() => {
    if (state.success > 0) {
      playPair()
    }
  }, [state.success, playPair])

  useEffect(() => {
    if (state.gameCompleted) {
      onEnd()
    }
  }, [state.gameCompleted, onEnd])

  return (
    <div className={'w-[880px] mx-auto mt-[50px] game-table-' + current}>
      {state.cards.map((card, i) => {
        return (
          <div
            key={i}
            data-id={card.id}
            className={
              state.successCards.has(card.id)
                ? 'game-card flip'
                : state.openCards.includes(i)
                ? 'game-card flip'
                : 'game-card'
            }
            onClick={() => {
              if (state.openCards[1] >= 0) return

              dispatch.game.open({ i, id: card.id })
            }}
          >
            <div className="card-content">
              <div className="w-full h-full z-10 hidden-card">
                <img src={card.src} alt={card.name} className="w-full h-full" />
              </div>
              <div className="z-10 card-back">
                <img src={CardBackImg} alt="card_back" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GameTable
