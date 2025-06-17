import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { v4 as uuidv4 } from 'uuid'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import { useTranslation } from 'react-i18next'
import useIdleTimer from '../hooks/useIdleTimer'
// import { levelMap } from '../utils'

// import { db } from '../firebase/config'
// import { doc, setDoc, Timestamp } from 'firebase/firestore'

import Button from '../components/Button'

// const saveData = async (level, payload) => {
//   const kioskId = localStorage.getItem('kiosk-id') || ''
//   const id = uuidv4()

//   const ref = doc(db, `memory-game`, `scores`, levelMap[level / 2 - 1], id)

//   // Debug log
//   console.log('Saving to Firestore:', {
//     kioskId,
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     score: Number(payload.score),
//     language: payload.language,
//     createdAt: Timestamp.now(),
//   })

//   await setDoc(ref, {
//     kioskId,
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     score: Number(payload.score),
//     language: payload.language,
//     createdAt: Timestamp.now(),
//   }).catch((err) => console.log(err))
// }

const keyboardLayouts = {
  'default-en': [
    '1 2 3 4 5 6 7 8 9 0 - {bksp}',
    'q w e r t y u i o p',
    'a s d f g h j k l',
    '{shift} z x c v b n m , . {shift}',
    '.com @ {space} .ca',
  ],
  'shift-en': [
    '! @ # $ ^ & * ( ) _ + {bksp}',
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    '{shift} Z X C V B N M ? . {shift}',
    '.com @ {space} .ca',
  ],
  'default-fr': [
    '1 2 3 4 5 6 7 8 9 0 - {bksp}',
    'q w e r t y u i o p ç .',
    'a s d f g h j k l ; è à',
    '{shift} ù z x c v b n m , é {shift}',
    '.com @ {space} .ca',
  ],
  'shift-fr': [
    '! @ # $ % & * ( ) _ + {bksp}',
    "Q W E R T Y U I O P Ç '",
    'A S D F G H J K L È À "',
    '{shift} Ù Z X C V B N M , É {shift}',
    '.com @ {space} .ca',
  ],
  numbers: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
}

const DataEntry = () => {
  const [keyboardIns, setKeyboardIns] = useState(null)
  const [focusedInput, setFocusedInput] = useState('')
  const [maxLength, setMaxLength] = useState(99)
  const [loading, setLoading] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const { i18n, t } = useTranslation()
  const [keyLayoutName, setKeyLayoutName] = useState('default-' + i18n.language)

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' })
  const [emailError, setEmailError] = useState('')

  const navigate = useNavigate()

  // const { current } = useSelector((state) => state.level)

  useEffect(() => {
    setKeyLayoutName('default-' + i18n.language)
  }, [i18n.language])

  const onKeyboardInit = (keyboard) => {
    setKeyboardIns(keyboard)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const setValueToInput = (value) => {
    const updated = { ...formData }

    switch (focusedInput) {
      case 'firstName':
        updated[focusedInput] = value ? value.charAt(0).toUpperCase() + value.slice(1) : ''
        break
      case 'lastName':
        updated[focusedInput] = value ? value.charAt(0).toUpperCase() + value.slice(1) : ''
        break
      case 'email':
        updated[focusedInput] = value
        if (value && !validateEmail(value)) {
          setEmailError('Please enter a valid email address')
        } else {
          setEmailError('')
        }
        break
      default:
        updated[focusedInput] = value
        break
    }

    setFormData((prevState) => ({
      ...prevState,
      ...updated,
    }))
  }

  const onChange = (value) => {
    setValueToInput(value)
  }

  const onKeyPress = (button) => {
    if (button === '{shift}' || button === '{lock}') {
      handleShift()
    } else if (button === '{numbers}' || button === '{abc}') {
      handleNumbers()
    }

    let currentInputValue = ''
    switch (focusedInput) {
      case 'firstName':
        currentInputValue = formData.firstName
        break
      case 'lastName':
        currentInputValue = formData.lastName
        break
      case 'email':
        currentInputValue = formData.email
        break
      default:
        break
    }

    let specialValue = null
    switch (button) {
      case '{@}':
        specialValue = currentInputValue + '@'
        break
      case '{.}':
        specialValue = currentInputValue + '.'
        break
      case '{-}':
        specialValue = currentInputValue + '-'
        break
      case '{_}':
        specialValue = currentInputValue + '_'
        break
      case '{.com}':
        specialValue = currentInputValue + '.com'
        break
      case '{#}':
        specialValue = currentInputValue + '#'
        break
      case '{+}':
        specialValue = currentInputValue + '+'
        break
      default:
        break
    }

    if (specialValue) {
      setValueToInput(specialValue)
    }
  }

  const handleShift = () => {
    const newLayoutName = keyLayoutName.startsWith('default') ? 'shift-' + i18n.language : 'default-' + i18n.language

    setKeyLayoutName(newLayoutName)
  }

  const handleNumbers = () => {
    const currentLayout = keyLayoutName
    const numbersToggle = currentLayout !== 'numbers' ? 'numbers' : 'default'

    setKeyLayoutName(numbersToggle)
  }

  const onInputFocus = (inputName, input) => {
    const inputValue = input.value
    const maxLength = Number(input.getAttribute('maxlength')) || 99
    const type = input.getAttribute('type')

    if (keyboardIns !== null) {
      keyboardIns.setInput(inputValue)
    }

    setMaxLength(maxLength)
    setKeyLayoutName(type === 'number' ? 'numbers' : 'default-' + i18n.language)
    setFocusedInput(inputName)
  }

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      if (!formData.firstName || !formData.lastName || !formData.email) {
        return
      }

      if (!validateEmail(formData.email)) {
        setEmailError('Please enter a valid email address')
        return
      }

      setLoading(true)

      // Store full names in localStorage
      localStorage.setItem('firstName', formData.firstName);
      localStorage.setItem('lastName', formData.lastName);
      localStorage.setItem('email', formData.email);
      const language = i18n.language;
      localStorage.setItem('language', language);

      navigate('/instructions');
      setLoading(false);
    },
    [navigate, formData, i18n.language]
  )

  const handleTermsCheckbox = (e) => {
    if (!termsAccepted) {
      setShowTermsModal(true)
    } else {
      setTermsAccepted(false)
    }
  }

  const handleCloseTermsModal = () => {
    setTermsAccepted(true)
    setShowTermsModal(false)
  }

  const handleNewsletterClick = () => {
    setShowNewsletterModal(true)
  }

  const Modal = ({ isOpen, onClose, title, children, buttonText }) => {
    if (!isOpen) return null

    return (
      <div className="bg-[#3C4A3A] fixed top-[500px] w-full h-[1500px] inset-0 flex flex-col items-center justify-center z-50">
        <div className="w-[900px] flex flex-col justify-between items-center">
          <h3 className="font-bold leading-[1.1] text-[60px] mb-12 decoration-[15px] underline underline-offset-[20px]">{title}</h3>
          <div className="p-8 rounded-lg w-[90%] h-[1000px] overflow-y-auto">
            <div className="text-[30px] font-bold">{children}</div>
          </div>
          <div className="flex py-10 w-full">
            <Button
              onClick={onClose}
              className="bg-[#EC4F54] w-full rounded-none text-white font-bold px-8 py-4 text-[60px]"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  useIdleTimer()

  return (
    <>
      <h2 className="text-[60px] mt-[50px] leading-[1.1] px-6 w-[880px] mx-auto text-white font-semibold text-center">
        Win 2 Dwayne Gretzky tickets & a 1-night stay - enter now!
      </h2>

      {/* <div className="text-black text-center bg-gray-100 w-[690px] h-[150px] rounded mx-auto mt-10 flex justify-center items-center">
        <p className="text-[80px]">{formatTime(score)}</p>
      </div> */}

      <div className="flex flex-col w-[800px] justify-center mx-auto items-center mt-[50px]">
        <div className="flex w-full gap-[50px] mb-[50px]">
          <div className="text-black flex-1 h-[102px]">
            <input
              type="text"
              value={formData.firstName}
              placeholder="First Name"
              maxLength="20"
              onChange={(e) => setValueToInput(e.target.value)}
              onFocus={(e) => onInputFocus('firstName', e.target)}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              required
              className="text-[40px] font-normal text-left w-full h-full py-4 px-4 shadow-[inset_-5.663px_-4.114px_3px_rgba(255,255,255,0.04),inset_5.516px_4.31px_3px_rgba(0,0,0,0.09)] focus:outline-[#111]"
            />
          </div>

          <div className="text-black flex-1 h-[102px]">
            <input
              type="text"
              value={formData.lastName}
              placeholder="Last Name"
              maxLength="20"
              onChange={(e) => setValueToInput(e.target.value)}
              onFocus={(e) => onInputFocus('lastName', e.target)}
              autoComplete="off"
              spellCheck={false}
              required
              className="text-[40px] font-normal text-left w-full h-full py-4 px-4 shadow-[inset_-5.663px_-4.114px_3px_rgba(255,255,255,0.04),inset_5.516px_4.31px_3px_rgba(0,0,0,0.09)] focus:outline-[#111]"
            />
          </div>
        </div>

        <div className="text-black w-full h-[102px] mx-auto mb-[50px]">
          <input
            type="email"
            value={formData.email}
            placeholder="Email"
            maxLength="50"
            onChange={(e) => setValueToInput(e.target.value)}
            onFocus={(e) => onInputFocus('email', e.target)}
            autoComplete="off"
            spellCheck={false}
            required
            className="text-[40px] font-normal text-left w-full h-full py-4 px-4 mx-auto shadow-[inset_-5.663px_-4.114px_3px_rgba(255,255,255,0.04),inset_5.516px_4.31px_3px_rgba(0,0,0,0.09)] focus:outline-[#111]"
          />
          {emailError && (
            <p className="text-red-500 text-[20px] mt-2">{emailError}</p>
          )}
        </div>

        <div className="w-full flex items-center gap-2 mb-[50px]">
          <input
            className="w-[60px] h-[60px] rounded-[30px]"
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={handleTermsCheckbox}
          />
          <label className="w-[710px] text-[35px] font-bold leading-[1.2] cursor-pointer px-[30px]" htmlFor="terms">
            Accept <span className="">Terms and Conditions</span>
          </label>
        </div>

        <div className="w-full flex items-center gap-2 mb-[50px]">
          <input
            className="w-[60px] h-[60px] rounded-[30px]"
            type="checkbox"
            id="newsletter"
          />
          <div className="w-[710px] text-[35px] font-bold leading-[1.2] cursor-pointer px-[30px]" onClick={handleNewsletterClick}>
            <span className="underline">Sign up for the <br /> Great Estates Newsletter!</span>
          </div>
        </div>
      </div>

      <div className="">
        <div className="text-2xl font-bold min-h-[360px]">
          <Keyboard
            layoutName={keyLayoutName}
            onChange={onChange}
            disableButtonHold={true}
            onKeyPress={onKeyPress}
            onInit={onKeyboardInit}
            stopMouseUpPropagation={true}
            stopMouseDownPropagation={true}
            layout={keyboardLayouts}
            maxLength={maxLength}
            display={{
              '{bksp}': '⌫',
              '{shift}': '⇧',
              '{controlleft}': 'ctrl ⌃',
              '{controlright}': 'ctrl ⌃',
              '{@}': '@',
              '{-}': '-',
              '{_}': '_',
              '{.}': '.',
              '{.com}': '.com',
              '{space}': ' ',
              '{return}': 'return',
            }}
          />
        </div>

        <Button disabled={loading} type="submit" className="bg-[#EC4F54] rounded-none font-bold text-white w-[880px] h-[122px] mt-20" onClick={onSubmit}>
          Submit
        </Button>
      </div>

      <Modal
        isOpen={showTermsModal}
        onClose={handleCloseTermsModal}
        title="Terms and Conditions"
        buttonText="Accept"
      >
        <div 
          className="space-y-4 text-[30px]"
          dangerouslySetInnerHTML={{
            __html: `
          Contest Rules &amp; Regulations ("Official Rules")
<br />
<br />
How to Enter: NO PURCHASE NECESSARY. No purchase or payment necessary to enter or win.
Purchase will not improve an entrant&#39;s chance of winning. The Contest commences at 9:00am
EST on June 20, 2025, and closes at 8:59pm EST on July 25, 2025.
Enter by filling out the contest entry form
at [https://www.greatestatesniagara.com/SummerGiveaway] or complete the digital form
available on the digital kiosk located at Jackson-Triggs Niagara Estate. All entries must be
submitted online no later than 8:59pm EST on July 25, 2025, THE CONTEST CLOSING DATE.
Participation is limited to one (1) entry per person, per day, during the contest period,
determined based on email address and phone number. Website tracking determines date and
time of entry. If it is discovered that you attempted to enter more than once, all your entries
will be void. Arterra Wines Canada, Inc. (the "Sponsor"), is not responsible for technical,
hardware or software malfunctions, lost, delayed, or corrupted data transmission, line failures
of any network or telephone, or inability to access the website.
Eligibility:  This Contest is open to residents of the Province of Ontario, who are of legal
drinking age or older in the Province of Ontario, except for directors, officers, employees, and
contractors (and those with whom they are domiciled, and their immediate families, which
includes spouse, sibling, parent and child) of the Sponsor, its agents or representatives, liquor
licensees, or any distributor or company involved in any phase of Contest administration.
Grand Prizes:   There are 5 grand prizes in total. Each "Grand Prize" to be won consists of:
• 2 tickets to the Dwayne Gretzky Concert on September 12, 2025, at the Jackson-Triggs
Amphitheatre, a 1-night stay at a local hotel (5 winners). (The approximate retail value
of each Grand Prize is $520 CAD.)
The Grand Prizes must be accepted as awarded, are not transferable and are not redeemable
for cash. All taxes, and other expenses not covered within the Grand Prize packages are the
responsibility of the respective winner. The Sponsor reserves the right at any time to substitute
the Grand Prize (or component thereof) for any reason, so long as a Grand Prize (or
component) of comparable value are substituted.
Winner Selection: On July 26, 2025, five (5) winners will be selected in a random draw at
12:00pm EST in Toronto, Ontario from among all eligible entries received online. The random
draw will be conducted by an independent judging organization whose decisions will be final
and binding in all matters relating to this Contest. In order to be declared a winner, the selected
entrant must have complied with these Official Rules and must correctly answer a time-limited
mathematical, skill-testing question to be administered by mail, telephone or online without
assistance of any kind and sign a Confirmation of Compliance with Rules Acceptance of Prize &amp;
Release acknowledging and releasing Sponsor, Cire Communications Inc. (the "Contest
Administrator"), any distributor or company involved in the supply of the Grand Prizes, or any
component or any phase of contest administration, their respective officers, directors, agents,
representatives, successors and assigns (collectively the "Released Parties") from any liability

(including, without limitation, any damages, losses or injury) in connection with this Contest,
the awarding of the Grand Prizes and/or resulting from acceptance or use of the Grand Prizes
(including any prize-related activity). The odds of winning depend upon the number of entries
received. The selected entrants will be notified by telephone and electronic mail within two (2)
days of the draw date. If a selected entrant cannot be contacted within 48 hours of selection, if
there is a return of any Grand Prize or Secondary Prize notification as undeliverable, or if the
selected entrant fails to comply with any of the foregoing, that selected entrant will be
disqualified and an alternate entrant will be selected from among the remaining eligible entries.
Winner must provide proof that they are of legal age to purchase alcohol products in the form
of government issued photo ID.
The entry dates and draw dates are as follows for all Grand Prizes:

• Entry period: June 20 th ,2025 at 9am EST –July 25 th ,2025 at 8:59pm EST
• Draw dates: July 26 th ,2025 at 12:00pm EST

Miscellaneous: The Provincial liquor agencies are not connected with this Contest in any
manner whatsoever and are not liable in any way whatsoever in regard to any matter that
relates to this Contest.
By accepting any of the Grand Prizes, the winners consent to the use of his/her name, address
(city and Province), voice, statements and/or photograph, without further compensation or
authorization, to be used for promotional purposes by the Sponsor or any related entities
thereto in connection with this Contest. All information obtained from non-winning ballots will
be used only to administer this Contest and for no other purpose. This Contest is subject to all
relevant Canadian laws, is owned and operated by the Sponsor and administered by Cire
Communications Inc. The Sponsor is not responsible for any printing errors or omissions and
reserves the right to cancel or amend this Contest in the event of such errors or omissions.
PRIVACY / USE OF PERSONAL INFORMATION.
By participating in the Contest, each entrant: (i) grants to the Sponsors the right to use his/her
personal information provided when he/she enters the Contest for the purpose of
administering the Contest, including but not limited to contacting and announcing the winners
and coordinating the provision of the Contest prize; (ii) acknowledges that the Sponsors may
disclose his/her Personal Information to service providers of the Sponsors in connection with
any of the activities listed in (i) above.
Arterra Wines Canada, Inc. will use each entrant's Personal Information only for identified
purposes and protect each entrant's Personal Information in a manner that is consistent with
the Arterra Wines Canada, Inc. Privacy Policy at:
https://www.greatestatesniagara.com/Legal/Privacy-Policy.
By entering the Contest, each entrant agrees to release, indemnify and forever hold harmless
the Released Parties from and against any and all claims, demands, damages, actions and
causes of action arising or to arise by reason of the entrant's participation in the Contest and/or
the acceptance, use or misuse of the Grand Prizes or Secondary Prizes.

Additionally, Instagram and its owner Meta Platforms, Inc. are also designated as Releasees.
The Contest is in no way sponsored, endorsed or administered by, or associated with Instagram
and/or its parent owner Meta Platforms, Inc. The Instagram Service is one of the Meta Products
provided for use by Meta Platforms, Inc. Instagram and Meta Platforms, Inc. is completely
released of all liability by each entrant or participant in this Contest. Any questions, comments
or complaints regarding the Contest must be directed to the Sponsor and not Instagram or
Meta Platforms, Inc. The Sponsor reserves the right to, without prior notice and at any time,
terminate this Contest, in whole or in part, or modify this Contest in any way, should any factor
interfere with its proper conduct as contemplated by these Official Rules and Regulations. The
Sponsor is not responsible for lost, incomplete or illegible entries. ANY ATTEMPT BY AN
ENTRANT TO DELIBERATELY DAMAGE THE WEBSITE OR UNDERMINE THE LEGITIMATE
OPERATION OF THE CONTEST IS IN VIOLATION OF CRIMINAL AND CIVIL LAWS AND SHOULD
SUCH AN ATTEMPT BE MADE, SPONSOR RESERVES THE RIGHT TO SEEK REMEDIES AND
DAMAGES FROM ANY SUCH PERSON TO THE FULLEST EXTENT PERMITTED BY LAW, INCLUDING
CRIMINAL PROSECUTION. Sponsor reserves the right, at its sole discretion, to disqualify any
individual it finds, in its sole discretion, to be tampering with the entry process or the operation
of this Contest or website; to be in violation of the terms of service of the website; to be acting
in violation of these Official Rules; or to be acting in a non-sportsmanlike or disruptive manner,
or with intent to annoy, abuse, threaten or harass any other person. Automated entries
(including but not limited to entries submitted using any bot, script, macro or Contest service),
copies, third-party entries, facsimiles and/or mechanical reproductions are not permitted and
will be disqualified. In the event of multiple persons attempting to enter the Contest through
one email account, the authorized account subscriber is deemed to be the natural person who
is assigned an email address by an Internet access provider, online service provider or other
organization, which is responsible for assigning email addresses or the domain associated with
the submitted email address.
            `
          }}
        />
      </Modal>

      <Modal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
        title="Great Estates Newsletter"
        buttonText="Close"
      >
        <div className="space-y-4 text-[30px]">
          <p>I consent to Arterra Wines Canada, Inc. and its affiliates (“Arterra Wines Canada”) sending me electronic messages to my email about promotions, offers, updates and events relating to Arterra brands, estates and select partners.</p>
          <p>{`(You may unsubscribe at any time by clicking the unsubscribe link in the footer or our emails. We will treat the information you provide in accordance with our Privacy Policy found at https://www.greatestatesniagara.com/Legal/Privacy-Policy.`}</p>
        </div>
      </Modal>
    </>
  )
}

export default DataEntry
