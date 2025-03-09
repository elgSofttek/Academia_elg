import firebaseElg from "./firebaseConfig";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
}from 'firebase/firestore';

const db=getFirestore(firebaseElg);

export const readDataFirestore = async (path, child, value) => {

    const q = query(collection(db, path), where(child, '==', value));
    const querySnapshot = await getDocs(q);
  
    return querySnapshot;
  };

// Leer documentos
export const readAllDataFirestore = async (path) => {
    const q = query(collection(db, path));
    const querySnapshot = await getDocs(q);

    // 🔹 Extrae los datos de cada documento y agrega el ID
    return querySnapshot.docs.map(doc => ({
        id: doc.id,  // 🔹 Agrega el ID del documento
        ...doc.data()
    }));
};


// Agregar documento
export const addDataFirestore = async (path, data) => {
    const docRef = await addDoc(collection(db, path), data);
    return docRef.id;
};

// Actualizar documento
export const updateDataFirestore = async (path, docId, data) => {
    await updateDoc(doc(db, path, docId), data);
};

// Eliminar documento
export const deleteDataFirestore = async (path, docId) => {
    await deleteDoc(doc(db, path, docId));
};