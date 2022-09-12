// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";   // Not used
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQQtHPNcn1W5C0RG1OCtWEiDhh-ejU79Q",
    authDomain: "my-twitter-clone-2022.firebaseapp.com",
    projectId: "my-twitter-clone-2022",
    storageBucket: "my-twitter-clone-2022.appspot.com",
    messagingSenderId: "1050452759503",
    appId: "1:1050452759503:web:2d2d3c45ccb751cbc478ba",
    measurementId: "G-9GWWX23EER"   // Not used
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const analytics = getAnalytics(app);    // Not used

export default app;
export { db, storage };

