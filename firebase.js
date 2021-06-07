import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyD8uAEU4ifRMpSbMVOpVjj9RF05woHTKpY',
  authDomain: 'signal-next.firebaseapp.com',
  projectId: 'signal-next',
  storageBucket: 'signal-next.appspot.com',
  messagingSenderId: '298673064922',
  appId: '1:298673064922:web:0cfe873deb2ef8949d8ee3',
  measurementId: 'G-54W9QEK38Z'
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
