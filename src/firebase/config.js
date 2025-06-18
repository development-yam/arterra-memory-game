import { initializeApp } from 'firebase/app'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCTvbqq8XgfEu3LWUn6tph6KFFvEHWTOA4",
  authDomain: "arterra-games.firebaseapp.com",
  projectId: "arterra-games",
  storageBucket: "arterra-games.firebasestorage.app",
  messagingSenderId: "149240267950",
  appId: "1:149240267950:web:85af3ee161cd00aca0993f"
}

const app = initializeApp(firebaseConfig)

initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
})

const db = getFirestore(app)

export { db }
