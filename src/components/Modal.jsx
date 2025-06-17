import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import Header from '../layout/partials/Header'
import Button from '../components/Button'

const Modal = ({ isModalOpen, closeModal, setIsChecked }) => {
  const { t } = useTranslation()

  return (
    <>
      {isModalOpen
        ? createPortal(
            <div className="_black-gradient text-4xl w-[100vw] h-[100vh] absolute top-0 left-0 z-40">
              <Header />

              <div className="bg-white w-[80%] p-10 mt-20 rounded-[6px] relative left-[50%] translate-x-[-50%] overflow-y-scroll z-40">
                <h1 className="text-6xl text-brandPink text-center mt-20">{t('termsAndConditions')}</h1>
                <section className="text-black px-4 my-10">
                  <p className="mb-6">{t('termsAndConditions1')}</p>
                  <p className="mb-6">{t('termsAndConditions2')}</p>
                  <p className="mb-6">{t('termsAndConditions3')}</p>
                  <p className="mb-6">{t('termsAndConditions4')}</p>
                </section>

                <Button
                  className="w-[400px] h-[122px] my-20"
                  onClick={() => {
                    closeModal()
                    setIsChecked(true)
                  }}
                >
                  {t('close')}
                </Button>
              </div>
            </div>,
            document.getElementById('master-layout')
          )
        : null}
    </>
  )
}

export default Modal
