import { initializeApp } from 'firebase/app'
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOHpJvo6wfcsuz2nVrg6DTIN6o6mejJ3c",
  authDomain: "emmanuel-noteapp.firebaseapp.com",
  projectId: "emmanuel-noteapp",
  storageBucket: "emmanuel-noteapp.appspot.com",
  messagingSenderId: "158948237715",
  appId: "1:158948237715:web:b695dd58ed24df954e4866"
  };
  
    initializeApp(firebaseConfig);
   const db =  getFirestore()

   export { db}

