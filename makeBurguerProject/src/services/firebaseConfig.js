import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBZM0RNyAC7WF1ZnGlCqgqyYXCh9C_j6y4',
  authDomain: 'makeyourburger-d073d.firebaseapp.com',
  projectId: 'makeyourburger-d073d',
  storageBucket: 'makeyourburger-d073d.appspot.com',
  messagingSenderId: '945043175679',
  appId: '1:945043175679:web:24bcc5bf11bb7912b474ca'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
