import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const KioskId = () => {
  const { kioskId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Kiosk ID', kioskId)

    if (!window.localStorage) {
      alert('no local storage')
    }

    if (kioskId) {
      localStorage.setItem('kiosk-id', kioskId)
    }

    if (!localStorage.getItem('kiosk-id')) {
      console.warn('No kiosk ID provided')
    }

    navigate('/')
  }, [kioskId, navigate])
}

export default KioskId
