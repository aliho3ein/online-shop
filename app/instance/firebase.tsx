import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSfOj4Bkq_WPvQi2_8NLR29IpF_FUdQEg",
  authDomain: "online-shop-87fb7.firebaseapp.com",
  databaseURL:
    "https://online-shop-87fb7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "online-shop-87fb7",
  storageBucket: "online-shop-87fb7.appspot.com",
  messagingSenderId: "574961560648",
  appId: "1:574961560648:web:242bbdaa461dc9bba5fc7d",
  measurementId: "G-HNS5JWPPDM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
