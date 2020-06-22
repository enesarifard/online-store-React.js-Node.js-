import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC9zprzaBKy4e3-06fH3pRbxAKhebE6BcA',
  authDomain: 'store-db-2ed5c.firebaseapp.com',
  databaseURL: 'https://store-db-2ed5c.firebaseio.com',
  projectId: 'store-db-2ed5c',
  storageBucket: 'store-db-2ed5c.appspot.com',
  messagingSenderId: '877488908392',
  appId: '1:877488908392:web:0f6ecd1ae1a41ab89173dd',
  measurementId: 'G-Y87S3937LL',
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
        ...additionalData,
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
provider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
