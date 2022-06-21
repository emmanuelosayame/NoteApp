import { initializeApp } from 'firebase/app'
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdOBrQnwaifcoeKPHa1JCou2Dcn4WhrUM",
    authDomain: "emmanuel-notesapp.firebaseapp.com",
    projectId: "emmanuel-notesapp",
    storageBucket: "emmanuel-notesapp.appspot.com",
    messagingSenderId: "388756817249",
    appId: "1:388756817249:web:54deaee11c43ae937af120",
    measurementId: "G-KXDDS90TFN"
  };
  
    initializeApp(firebaseConfig);
   const db =  getFirestore()

   export { db}

