import firebaseElg from "./firebaseConfig";
import{
  getDatabase,
  get,
  ref,
  query,
  equalTo,
  orderByChild,
}from 'firebase/database';

const db = getDatabase(firebaseElg);


//Se hace la llamada a la base de datos
export const readData=async(path,child,value)=>{
    const user= query(ref(db,path),orderByChild(child),equalTo(value));
    return await get(user);
  };