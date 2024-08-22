// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDHrYdGH_kB-Buq8DG-oQk6s85t2xSFKfo",
    authDomain: "dwaya-f574d.firebaseapp.com",
    projectId: "dwaya-f574d",
    storageBucket: "dwaya-f574d.appspot.com",
    messagingSenderId: "470394006213",
    appId: "1:470394006213:web:b7fbb67e52b4fb321c9eac",
    measurementId: "G-RNN6393HEW",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
