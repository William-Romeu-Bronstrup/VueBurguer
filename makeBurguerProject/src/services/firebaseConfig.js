import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDocs, collection } from 'firebase/firestore'

const { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } =
  import.meta.env

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: 'makeyourburger-317af',
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db, getDocs, collection }
