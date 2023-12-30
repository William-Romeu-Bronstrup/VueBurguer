import { auth, onAuthStateChanged } from '@/services/firebaseConfig'

export function verifyCurrentLogin() {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}
