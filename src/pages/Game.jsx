import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useSound from 'use-sound'
import SuccessSfx from '../assets/sfx/success.mp3'
import useIdleTimer from '../hooks/useIdleTimer'
import { formatTime } from '../utils'
import { db } from '../firebase/config'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { levelMap } from '../utils'
import { v4 as uuidv4 } from 'uuid'

import GameTable from '../components/GameTable'

class Timer {
  start(cb) {
    this.interval = setInterval(cb, 1000)
  }

  stop() {
    clearInterval(this.interval)
  }
}

function Game() {
  const [timer] = useState(() => new Timer())
  const [score, setScore] = useState(0)

  const navigate = useNavigate()

  const { current } = useSelector((state) => state.level)

  const [playSuccess] = useSound(SuccessSfx)

  useEffect(() => {
    if (current === null) {
      navigate('/')
    }
  }, [navigate, current])

  useEffect(() => {
    timer.start(() => setScore((i) => i + 1))
  }, [timer])

  const saveScoreToFirestore = async (level, firstName, lastName, email, termsAccepted, newsletterSubscribed, score, language) => {
    const kioskId = localStorage.getItem('kiosk-id') || '';
    const id = uuidv4();
    const ref = doc(db, 'memory-game', 'scores', levelMap[level / 2 - 1], id);
    await setDoc(ref, {
      kioskId,
      firstName,
      lastName,
      email,
      termsAccepted,
      newsletterSubscribed,
      score: Number(score),
      language,
      createdAt: Timestamp.now(),
    });
  };

  const onEnd = useCallback(() => {
    timer.stop()
    localStorage.setItem('score', score.toString())
    playSuccess()

    // Read user info from localStorage
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    const email = localStorage.getItem('email') || '';
    const termsAccepted = localStorage.getItem('termsAccepted') || false;
    const newsletterSubscribed = localStorage.getItem('newsletterSubscribed') || false;
    const language = localStorage.getItem('language') || 'en';

    // Save to Firestore
    saveScoreToFirestore(current, firstName, lastName, email, termsAccepted, newsletterSubscribed, score, language);

    setTimeout(() => {
      navigate('/leaderboard')
    }, 1500)
  }, [navigate, timer, score, playSuccess, current])

  useIdleTimer()

  return (
    <>
      <div className="text-black text-center bg-gray-100 w-[880px] h-[150px] mx-auto mt-[50px] flex justify-center items-center">
        <p className="text-[80px]">{formatTime(score)}</p>
      </div>

      <GameTable onEnd={onEnd} />
    </>
  )
}

export default Game
