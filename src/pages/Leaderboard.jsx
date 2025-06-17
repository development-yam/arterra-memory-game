import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import useIdleTimer from '../hooks/useIdleTimer'
import { formatTime, levelMap } from '../utils'

import { db } from '../firebase/config'
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore'

import Button from '../components/Button'
import Spinner from '../components/Spinner'

const Leaderboard = () => {
  const [stack, setStack] = useState([])
  const [userRank, setUserRank] = useState(0)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { current } = useSelector((state) => state.level)
  const kioskId = localStorage.getItem('kiosk-id')
  const score = Number(localStorage.getItem('score'))
  const firstName = localStorage.getItem('firstName') || ''
  const lastName = localStorage.getItem('lastName') || ''

  // Create display name for current user with null check
  const displayName = firstName && lastName ? `${firstName} ${lastName.charAt(0)}.` : ''

  useEffect(() => {
    if (!current) return;
    
    const level = levelMap[current / 2 - 1];
    const ref = collection(db, 'memory-game', 'scores', level);

    // Get all scores for ranking
    const allScoresQuery = query(ref, orderBy('score', 'asc'), where('kioskId', '==', kioskId));
    const topScoresQuery = query(ref, orderBy('score', 'asc'), where('kioskId', '==', kioskId), limit(10));

    const unsubscribe = onSnapshot(topScoresQuery, (querySnapshot) => {
      setStack(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            score: data.score,
          }
        })
      )
    });

    // Get user's rank
    const unsubscribeRank = onSnapshot(allScoresQuery, (querySnapshot) => {
      const allScores = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            score: Number(data.score),
            firstName: data.firstName || '',
            lastName: data.lastName || ''
          };
        })
        .sort((a, b) => a.score - b.score);

      // Find the index of the user's score
      const userIndex = allScores.findIndex(entry => 
        Number(entry.score) === Number(score) && 
        entry.firstName === firstName && 
        entry.lastName === lastName
      );

      // If found, set the rank (index + 1)
      if (userIndex !== -1) {
        setUserRank(userIndex + 1);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeRank();
    };
  }, [kioskId, current, score, firstName, lastName]);

  useIdleTimer()

  // Find if the local user is in the top 10
  const userInTop = stack.some(entry => 
    entry.firstName === firstName && 
    entry.lastName === lastName && 
    entry.score === score
  );

  return (
    <>
      <h2 className="text-[60px] mt-[50px] text-[#EC4F54] font-bold text-center">{t('wellDone')}</h2>

      <div className="text-black text-center bg-gray-100 w-[690px] h-[150px] rounded mx-auto mb-16 flex justify-center items-center ">
        <p className="text-[80px] font-semibold">{formatTime(score)}</p>
      </div>

      <h1 className="text-center font-bold leading-[1.1] text-[60px] mb-[50px] decoration-[15px] underline underline-offset-[20px] ">Great Estate Pairing Pros</h1>
      {!stack ? (
        <Spinner />
      ) : (
        <div className="text-white w-[80%] mx-auto">
          <div className="">
            {stack.map((entry, idx) => {
              const isCurrentUser = entry.firstName === firstName && entry.lastName === lastName && entry.score === score;
              const entryDisplayName = entry.firstName && entry.lastName ? 
                `${entry.firstName.slice(0, 10)} ${entry.lastName.slice(0, 10).charAt(0)}.` : '';
              return (
                <div
                  key={entry.id}
                  className={`text-[40px] w-[80%] px-10 border-b-2 mx-auto py-2 flex items-center ${isCurrentUser ? ' w-[83%] -mt-[10px] bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.3)] text-black rounded-xl font-normal' : ''}`}
                >
                  <div className="w-[10%]">{idx + 1}.</div>
                  <div className="text-left font-semibold leading-none w-[45%]">{entryDisplayName}</div>
                  <div className="text-right font-semibold leading-none w-[40%]">{formatTime(entry.score)}</div>
                </div>
              );
            })}
          </div>

          {/* Show user's score at bottom if not in top 10 */}
          {!userInTop && firstName && lastName && score && userRank > 0 && (
            <div className="relative top-5 w-[80%] mx-auto border-white/50">
              <div className="text-[40px] bg-white text-black w-full px-10 border-b-2 mx-auto my-4 flex items-center shadow-[0_0_30px_10px_rgba(255,255,255,0.3)] rounded-lg">
                <div className="w-[25%]">{userRank}.</div>
                <div className="text-left font-semibold leading-none w-[45%]">{displayName}</div>
                <div className="text-right font-semibold leading-none w-[30%]">{formatTime(score)}</div>
                {/* <div className="w-[25%]">{userRank}.</div>
                <div className="text-left font-semibold leading-none w-[45%]">{displayName}</div>
                <div className="text-right font-semibold leading-none w-[30%]">{formatTime(score)}</div> */}
              </div>
            </div>
          )}
        </div>
      )}

      <Button type="submit" className="bg-[#EC4F54] rounded-none font-bold text-white w-[880px] h-[122px] absolute bottom-[108px] left-1/2 -translate-x-1/2" onClick={() => navigate('/')}>
        Close
      </Button>
    </>
  )
}

export default Leaderboard
