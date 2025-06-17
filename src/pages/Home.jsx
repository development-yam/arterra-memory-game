import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import cta from '../assets/cta.mp4'

const Home = () => {
  const navigate = useNavigate()
  const { level } = useDispatch()

  useEffect(() => {
    const kioskId = localStorage.getItem('kiosk-id')

    localStorage.clear()
    localStorage.setItem('kiosk-id', kioskId)

    level.reset()
  }, [level])

  return (
    <div  
      onClick={() => navigate('/data-entry')}
      className="w-screen h-screen overflow-hidden cursor-pointer"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[99]"
      >
        <source src={cta} type="video/mp4" />
      </video>
    </div>
  )
}

export default Home
