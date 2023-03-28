import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
