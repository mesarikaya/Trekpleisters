// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVbG3clUnAm380B-F_hsCnLBv4U_4ff9M",
  authDomain: "foodlocal-47d64.firebaseapp.com",
  projectId: "foodlocal-47d64",
  storageBucket: "foodlocal-47d64.appspot.com",
  messagingSenderId: "1020243397400",
  appId: "1:1020243397400:web:028020a720c6126e5f6c6d",
};

// Initialize Firebase
//if (!AppState.length)
const app = initializeApp(firebaseConfig, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth, app };
