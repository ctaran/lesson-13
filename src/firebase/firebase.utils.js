import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDmV_tfVZKAPYjzC5UqxFH0it7-Ukl6wO0",
  authDomain: "crwn-db-659f9.firebaseapp.com",
  databaseURL: "https://crwn-db-659f9.firebaseio.com",
  projectId: "crwn-db-659f9",
  storageBucket: "crwn-db-659f9.appspot.com",
  messagingSenderId: "175225239930",
  appId: "1:175225239930:web:cf9b98510278b3e9a83ec3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
