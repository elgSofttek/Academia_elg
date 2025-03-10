import { use } from "react";
import firebaseElg from "./firebaseConfig";
import { 
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut 
} from "firebase/auth";

const auth = getAuth(firebaseElg);

export const signinUser=(email, password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        console.log(userCredential);

        // ...
      })
      .catch((error) => {
        console.log(error);
      });
}

export const logoutFirebase=()=>{
    signOut(auth)
    .then(() => {
 
      console.log("Usuario salió")
    }).catch((error) => {
      console.log(error)
    });
        
};

export const userListener=(Listener)=>{
    onAuthStateChanged(auth,(user)=>{
      Listener(user);
    })
}
