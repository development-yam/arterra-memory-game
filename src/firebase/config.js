import { initializeApp } from 'firebase/app'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA6VP9ORszTVHAy8pW4ctI6hX31LGCx4p0",
  authDomain: "bell-memory-game.firebaseapp.com",
  projectId: "bell-memory-game",
  storageBucket: "bell-memory-game.firebasestorage.app",
  messagingSenderId: "427201280146",
  appId: "1:427201280146:web:46da5a8c7981f5d2e28e4b"
}

const app = initializeApp(firebaseConfig)

initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
})

const db = getFirestore(app)

export { db }
