import firebaseElg from "./firebaseConfig";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
}from 'firebase/firestore';

const db=getFirestore(firebaseElg);

export const readDataFirestore = async (path, child, value) => {
    const q = query(collection(db, path), where(child, '==', value));
    const querySnapshot = await getDocs(q);
  
    return querySnapshot;
  };