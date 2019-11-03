import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCz89BsvmyBGY7EQZbuMSd9EUTtz4AsIrU",
  authDomain: "crwn-db-26841.firebaseapp.com",
  databaseURL: "https://crwn-db-26841.firebaseio.com",
  projectId: "crwn-db-26841",
  storageBucket: "crwn-db-26841.appspot.com",
  messagingSenderId: "436665513851",
  appId: "1:436665513851:web:600a89b63a40d07a30afde",
  measurementId: "G-HYJ8JYRMQF"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
