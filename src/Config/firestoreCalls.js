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
    serverTimestamp
} from 'firebase/firestore';

const db = getFirestore(firebaseElg);

export const readDataFirestore = async (path, child, value) => {
    try {
        const q = query(collection(db, path), where(child, '==', value));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error("Error al leer datos en Firestore:", error);
        return null;
    }
};

export const readUserTasks = async (userId) => {
    try {
        const q = query(collection(db, "tasks"), where("creatorId", "==", userId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error al obtener las tareas del usuario:", error);
        return [];
    }
};
export const checkIfAdmin = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        return userDoc.exists() && userDoc.data().permissions?.admin === true;
    } catch (error) {
        console.error(" Error al verificar permisos de administrador:", error);
        return false;
    }
};

export const readAllDataFirestore = async (path) => {
    try {
        const q = query(collection(db, path));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error(" Error al leer todos los documentos:", error);
        return [];
    }
};

export const addDataFirestore = async (path, data) => {
    try {
        console.log("Datos recibidos antes de agregar a Firestore:", JSON.stringify(data, null, 2));

        if (!data.creatorId || !data.creatorName || !data.content || !data.creatorEmail) {
            console.error("Faltan datos obligatorios para la tarea:", JSON.stringify(data, null, 2));
            return null;
        }

        const newData = {
            ...data,
            content: data.content.trim() || "Tarea sin título", 
            createdAt: serverTimestamp(), 
            completed: false
        };

        const docRef = await addDoc(collection(db, path), newData);
        console.log(` Tarea creada con ID: ${docRef.id}`);
        return docRef.id;
    } catch (error) {
        console.error(" Error al agregar la tarea:", error);
        return null;
    }
};


export const updateDataFirestore = async (path, docId, data) => {
    try {
        console.log(" Actualizando Firestore con:", JSON.stringify(data, null, 2));

        const updateFields = {};
        if (data.task) {
            updateFields.content = data.task; 
        }
        if (typeof data.isEditing !== "undefined") {
            updateFields.isEditing = data.isEditing; 
        }

        await updateDoc(doc(db, path, docId), updateFields);
        console.log(` Tarea actualizada correctamente: ${docId}`);
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
    }
};

export const deleteDataFirestore = async (path, docId, userId) => {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));

        if (!userDoc.exists() || !userDoc.data().permissions?.admin) {
            console.error(" Error: No tienes permisos para eliminar esta tarea.");
            return null;
        }

        await deleteDoc(doc(db, path, docId));
        console.log(` Tarea eliminada correctamente: ${docId}`);
    } catch (error) {
        console.error(" Error al eliminar la tarea:", error);
    }
};
