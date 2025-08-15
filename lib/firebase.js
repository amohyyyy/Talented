// ملف التهيئة الفعلية لـ Firebase — استخدمت القيم اللي أرسلتها علشان يكون الأمر مباشر
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvBlbWmFxN1t0Sv0TkWfcYndvgzq6499Y",
  authDomain: "edu-platform-35476.firebaseapp.com",
  projectId: "edu-platform-35476",
  storageBucket: "edu-platform-35476.firebasestorage.app",
  messagingSenderId: "823570222456",
  appId: "1:823570222456:web:656afb19407d955448cc8d",
  measurementId: "G-V7DZRJR57F"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
