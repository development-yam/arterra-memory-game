import { useNavigate, useLocation } from 'react-router-dom'

import headerLogo from '../../assets/images/great-estates-logo.png'
import home from '../../assets/images/home.png'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="w-full z-20 flex flex-col items-center mt-[100px]">
      <div className="w-[320px] h-[200px] flex justify-center items-center">
        <img src={headerLogo} alt="logo" />
      </div>

      <div className="w-full h-full mt-[50px] px-24 flex justify-between">
        {location.pathname !== '/leaderboard' && (
          <img src={home} alt="home" onClick={() => navigate('/')} />
        )}
      </div>
    </header>
  )
}

export default Header
