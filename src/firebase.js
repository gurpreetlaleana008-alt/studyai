import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyBUGBYGtAXu972Gwr_qrFQ28sT-8QxZKmw",
  authDomain: "studyai-app-cd443.firebaseapp.com",
  projectId: "studyai-app-cd443",
  storageBucket: "studyai-app-cd443.firebasestorage.app",
  messagingSenderId: "868148896957",
  appId: "1:868148896957:web:475c79427b0fed8b5ac3d4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };

export default app;