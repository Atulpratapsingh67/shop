import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {

  apiKey: "AIzaSyDPM_BXJVMOjLE6EuxIZ_eUyMM6YPIQ_Zc",

  authDomain: "shopmantra-db.firebaseapp.com",

  projectId: "shopmantra-db",

  storageBucket: "shopmantra-db.appspot.com",

  messagingSenderId: "1083628509890",

  appId: "1:1083628509890:web:6d8d5cb17fbdffbbf4f95b",

  measurementId: "G-VFM70PDYTZ"
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
