
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/database";





const Config = {
    apiKey: "AIzaSyCulZiR88fV1jZS_JgwLKE4O7lsDwuUg6M",
    authDomain: "crud-emp-63beb.firebaseapp.com",
    databaseURL: "https://crud-emp-63beb-default-rtdb.firebaseio.com",
    projectId: "crud-emp-63beb",
    storageBucket: "crud-emp-63beb.appspot.com",
    messagingSenderId: "789370874850",
    appId: "1:789370874850:web:9052ac387d49bfe996e7bb"
  };

firebase.initializeApp(Config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' }) 

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;


////////////////////////////////////    

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({          // Here we write and update the properties to the database by using .set()
                displayName,email,createdAt, ...additionalData 
            })
         }catch (error){
            console.log('error creating user', error.message)
         }
    }

    return userRef;
}