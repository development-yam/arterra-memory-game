import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      lang: 'Français',
      cta: 'Lorem ipsum dolor sit amet, consectetur adip?',
      tapToPlay: 'Tap to Play',
      instruction: 'Instructions',
      instruction1: 'Tap on cards to reveal them',
      instruction2: 'Match the pairs',
      next: 'NEXT',
      difficulty: 'Difficulty',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      wellDone: 'Well Done!',
      yourInitials: 'Your initials',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      email: 'Email',
      agreement1: 'I agree to the',
      agreement2: 'Terms & Conditions.',
      termsAndConditions: 'Terms & Conditions',
      termsAndConditions1:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices elementum diam, eget scelerisque sem.',
      termsAndConditions2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices elementum diam, eget scelerisque sem.',
      termsAndConditions3:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices elementum diam, eget scelerisque sem.',
      termsAndConditions4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      close: 'CLOSE',
      submit: 'SUBMIT',
      leaderboard: 'Leaderboard',
      highScore: 'High Score',
    },
  },
  fr: {
    translation: {
      lang: 'English',
      cta: 'Lorem ipsum dolor sit amet, consectetur adip?',
      tapToPlay: 'Jouez',
      instruction: 'Instruction',
      instruction1: 'Tapez sur les cartes pour les révéler',
      instruction2: 'Associez les paires',
      next: 'Suivant',
      difficulty: 'Difficulté',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
      wellDone: 'Bien Joué!',
      yourInitials: 'Vos initiales',
      firstName: 'Prénom',
      lastName: 'Nom',
      phone: 'Téléphone',
      email: 'Email',
      agreement1: "J'accepte les",
      agreement2: 'termes et conditions',
      termsAndConditions: 'Termes et Conditions',
      termsAndConditions1:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices elementum diam, eget scelerisque sem.',
      termsAndConditions2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices elementum diam, eget scelerisque sem.',
      termsAndConditions3:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices elementum diam, eget scelerisque sem.',
      termsAndConditions4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      close: 'Fermer',
      submit: 'Soumettre',
      leaderboard: 'Tableau de classement',
      highScore: 'Score Élevé',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', //language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    //you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    //if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
