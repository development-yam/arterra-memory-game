import { useNavigate } from 'react-router-dom'
import { useIdleTimer as idleTimer } from 'react-idle-timer'

const useIdleTimer = () => {
  const IDLE_TIMEOUT = 30000

  const navigate = useNavigate()

  return idleTimer({
    timeout: Number(IDLE_TIMEOUT),
    onIdle: () => {
      navigate('/')
    },
  })
}

export default useIdleTimer
