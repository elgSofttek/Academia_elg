import React, { useState, useEffect } from 'react';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { EditTodoForm } from './EditTodoForm';
import { List, Typography } from 'antd';
import { addDataFirestore, readAllDataFirestore, deleteDataFirestore, updateDataFirestore } from '../Config/firestoreCalls';
import { getAuth } from "firebase/auth";

const COLLECTION_NAME = "tasks";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const auth = getAuth();

  // ✅ Cargar tareas desde Firestore al montar el componente
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await readAllDataFirestore(COLLECTION_NAME);
        console.log('📢 Tareas obtenidas de Firestore:', fetchedTodos);
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("❌ Error al obtener tareas:", error);
      }
    };
    fetchTodos();
  }, []);

  // ✅ Agregar una tarea en Firestore con `creatorEmail` y `createdAt`
  const addTodo = async (taskContent) => {
    if (!auth.currentUser) {
      console.error("❌ Error: Usuario no autenticado.");
      return;
    }
    if (!taskContent.trim()) {
      console.error("❌ Error: La tarea no puede estar vacía.");
      return;
  }

    const newTask = {
      task: taskContent,
      creatorId: auth.currentUser.uid,
      creatorName: auth.currentUser.displayName || "Anónimo",
      creatorEmail: auth.currentUser.email || "No disponible",
      completed: false,
      isEditing: false
    };

    console.log("📢 Enviando tarea a Firestore:", newTask);


    const docId = await addDataFirestore(COLLECTION_NAME, newTask);
    if (docId) {
      setTodos([...todos, { id: docId, ...newTask }]);
    }
  };

  // ✅ Marcar una tarea como completada en Firestore
  const toggleComplete = async (id, completed) => {
    if (!id) {
      console.error("❌ Error: No se puede actualizar, id es undefined.");
      return;
    }

    await updateDataFirestore(COLLECTION_NAME, id, { completed: !completed });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  // ✅ Eliminar una tarea en Firestore
  const deleteTodo = async (id) => {
    if (!id) {
      console.error("❌ Error: No se puede eliminar, id es undefined.");
      return;
    }

    console.log(`🗑 Intentando eliminar tarea con id: ${id}`);
    await deleteDataFirestore(COLLECTION_NAME, id, auth.currentUser.uid);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✅ Habilitar modo edición en Firestore
  const editTodo = async (id, isEditing) => {
    if (!id) {
      console.error("❌ Error: No se puede editar, id es undefined.");
      return;
    }

    await updateDataFirestore(COLLECTION_NAME, id, { isEditing: !isEditing });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  // ✅ Editar una tarea en Firestore
  const editTask = async (task, id) => {
    if (!id) {
      console.error("❌ Error: No se puede actualizar la tarea, id es undefined.");
      return;
    }

    await updateDataFirestore(COLLECTION_NAME, id, { task, isEditing: false });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: false } : todo)));
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography.Title level={2}>To-Do List</Typography.Title>
      <TodoForm addTodo={addTodo} />
      <List
        bordered
        dataSource={todos}
        renderItem={(todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo 
              task={todo} 
              deleteTodo={deleteTodo} 
              editTodo={editTodo} 
              toggleComplete={() => toggleComplete(todo.id, todo.completed)} 
            />
          )
        }
      />
    </div>
  );
};