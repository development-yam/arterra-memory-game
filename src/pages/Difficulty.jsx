import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import useIdleTimer from '../hooks/useIdleTimer'

import Button from '../components/Button'

const Difficulty = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const { level } = useDispatch()

  useEffect(() => {
    const startTime = new Date().toLocaleString()

    localStorage.setItem('start-time', startTime)
  }, [])

  useIdleTimer()

  return (
    <div className="text-[60px] text-center h-[1540px] px-24">
      <p className="mt-[100px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ali.</p>

      <h1 className="text-[80px] text-brandPink mt-24">{t('difficulty')}</h1>
      <div className="text-black bg-[#d9d9d9] w-[600px] h-[450px] rounded-xl mx-auto mt-10 flex flex-col items-start justify-center">
        <label className="mt-2 ml-[100px] flex gap-20">
          <input type="radio" name="easy" className="w-[60px]" onChange={() => level.change(2)} />
          <p>{t('easy')}</p>
        </label>
        <label className="mt-2 ml-[100px] flex gap-20">
          <input type="radio" name="easy" defaultChecked className="w-[60px]" onChange={() => level.change(4)} />
          <p>{t('medium')}</p>
        </label>
        <label className="mt-2 ml-[100px] flex gap-20">
          <input type="radio" name="easy" className="w-[60px]" onChange={() => level.change(6)} />
          <p>{t('hard')}</p>
        </label>
      </div>

      <Button className="w-[880px] h-[122px] mt-[275px]" onClick={() => navigate('/game')}>
        {t('next')}
      </Button>
    </div>
  )
}

export default Difficulty
