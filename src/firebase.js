import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuKnX1zkDHlYW4r9yJpO_dPsCqoZk9--o",
  authDomain: "frontend-practice-app.firebaseapp.com",
  projectId: "frontend-practice-app",
  storageBucket: "frontend-practice-app.appspot.com",
  messagingSenderId: "865259386143",
  appId: "1:865259386143:web:e03808759812824318ec2a"
};

const app = initializeApp(firebaseConfig);
const db =getFirestore(app);

export default db;