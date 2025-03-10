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

// ✅ Leer documentos filtrados por un campo específico
export const readDataFirestore = async (path, child, value) => {
    try {
        const q = query(collection(db, path), where(child, '==', value));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error("❌ Error al leer datos en Firestore:", error);
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
        console.error("❌ Error al obtener las tareas del usuario:", error);
        return [];
    }
};
export const checkIfAdmin = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        return userDoc.exists() && userDoc.data().permissions?.admin === true;
    } catch (error) {
        console.error("❌ Error al verificar permisos de administrador:", error);
        return false;
    }
};

// ✅ Leer todos los documentos de una colección
export const readAllDataFirestore = async (path) => {
    try {
        const q = query(collection(db, path));
        const querySnapshot = await getDocs(q);

        // 🔹 Extrae los datos de cada documento y agrega el ID
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("❌ Error al leer todos los documentos:", error);
        return [];
    }
};

export const addDataFirestore = async (path, data) => {
    try {
        console.log("📢 Datos recibidos antes de agregar a Firestore:", JSON.stringify(data, null, 2));

        if (!data.creatorId || !data.creatorName || !data.content || !data.creatorEmail) {
            console.error("❌ Faltan datos obligatorios para la tarea:", JSON.stringify(data, null, 2));
            return null;
        }

        const newData = {
            ...data,
            content: data.content.trim() || "Tarea sin título", // 🔹 Asegura que siempre haya contenido
            createdAt: serverTimestamp(), // 🔥 Firestore generará la fecha aquí
            completed: false
        };

        const docRef = await addDoc(collection(db, path), newData);
        console.log(`✅ Tarea creada con ID: ${docRef.id}`);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error al agregar la tarea:", error);
        return null;
    }
};


// ✅ Actualizar documento (Ejemplo: marcar tarea como completada)
export const updateDataFirestore = async (path, docId, data) => {
    try {
        console.log("📢 Actualizando Firestore con:", JSON.stringify(data, null, 2));

        // 🔹 Asegurar que 'content' se actualiza correctamente
        const updateFields = {};
        if (data.task) {
            updateFields.content = data.task; // 🔥 Guarda la actualización en 'content'
        }
        if (typeof data.isEditing !== "undefined") {
            updateFields.isEditing = data.isEditing; // 🔥 Mantiene el estado de edición
        }

        await updateDoc(doc(db, path, docId), updateFields);
        console.log(`✅ Tarea actualizada correctamente: ${docId}`);
    } catch (error) {
        console.error("❌ Error al actualizar la tarea:", error);
    }
};

// ✅ Eliminar documento solo si el usuario tiene permisos de admin
export const deleteDataFirestore = async (path, docId, userId) => {
    try {
        // Obtener datos del usuario
        const userDoc = await getDoc(doc(db, "users", userId));

        // Verificar si el usuario existe y si el campo "permissions.admin" es true
        if (!userDoc.exists() || !userDoc.data().permissions?.admin) {
            console.error("❌ Error: No tienes permisos para eliminar esta tarea.");
            return null;
        }

        // Proceder a eliminar la tarea si tiene permisos
        await deleteDoc(doc(db, path, docId));
        console.log(`✅ Tarea eliminada correctamente: ${docId}`);
    } catch (error) {
        console.error("❌ Error al eliminar la tarea:", error);
    }
};
