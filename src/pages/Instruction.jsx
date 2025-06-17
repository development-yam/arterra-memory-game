import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useIdleTimer from '../hooks/useIdleTimer'

import instructionCard1 from '../assets/images/instructions-card-back.png'
import instructionCard2 from '../assets/images/card-0-p1.png'
import instructionCard3 from '../assets/images/card-0-p2.png'

import Button from '../components/Button'

const Instruction = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  useIdleTimer()

  return (
    <div className="text-[50px] text-center h-[1540px] px-24">
      <p className="font-bold leading-[1.1] text-[60px] mt-[65px] decoration-[15px] underline underline-offset-[20px] ">Great Estates Memory Match</p>
      <h1 className="font-bold text-[60px] text-[#EC4F54] mt-[86px] mb-[60px]">How to Play</h1>
      <img src={instructionCard1} alt="instructions_card" className="-mb-[10px] h-[200px] mx-auto" />
      <p className="px-4 font-bold text-[50px] my-[86px]">Flip cards one by one</p>
      <img src={instructionCard3} alt="instructions_card" className="absolute -mt-[25px] left-[370px] h-[200px] mx-auto" />
      <img src={instructionCard2} alt="instructions_card" className="absolute mt-[50px] left-[460px] h-[200px]" />
      <p className="px-4 mt-[350px] font-bold text-[50px]">Match pairs to reveal all cards!</p>

      <Button className="bg-[#EC4F54] rounded-none font-bold text-white w-[880px] h-[122px] mt-20" onClick={() => navigate('/game')}>
      Ready to Play!
      </Button>
    </div>
  )
}

export default Instruction
