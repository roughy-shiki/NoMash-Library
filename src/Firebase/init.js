// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZLQf2IpJnCRgVOLuIYd3pVxcCh38eSVI",
  authDomain: "fit5032-35524537.firebaseapp.com",
  projectId: "fit5032-35524537",
  storageBucket: "fit5032-35524537.firebasestorage.app",
  messagingSenderId: "511043587023",
  appId: "1:511043587023:web:e87bfab7a7fc5e826960ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
export default db