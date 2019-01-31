import firebase from 'firebase'

import {
  firebaseApiKey as apiKey,
  firebaseStorageBucket as storageBucket,
  firebaseProjectId as projectId,
} from './vars'

const config = {
  apiKey,
  storageBucket,
  projectId,
}

firebase.initializeApp(config)


export const storage = firebase.storage()
export const firestore = firebase.firestore()