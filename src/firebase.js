import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAr6ci2J_zyTd8wk_hfsaLUBBLtpg6ZPTY",
  authDomain: "student-12f21.firebaseapp.com",
  projectId: "student-12f21",
  storageBucket: "student-12f21.appspot.com",
  messagingSenderId: "844892906866",
  appId: "1:844892906866:web:e37bf64000a010fea829eb",
  measurementId: "G-KZ2SVLBV8S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
