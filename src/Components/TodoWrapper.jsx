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
        if (!auth.currentUser) return;

        console.log("🔄 Cargando tareas para:", auth.currentUser.email);

        try {
            const fetchedTodos = await readUserTasks(auth.currentUser.uid);
            console.log('📢 Tareas obtenidas de Firestore:', fetchedTodos);
            setTodos(fetchedTodos);
        } catch (error) {
            console.error("❌ Error al obtener tareas:", error);
        }
    };

    fetchTodos();
}, [auth.currentUser]); // 🔥 Se ejecuta cuando el usuario cambia


  const addTodo = async (todo) => {
    const newTask = { task: todo, completed: false, isEditing: false };
    const docId = await addDataFirestore(COLLECTION_NAME, newTask);
    setTodos([...todos, { id: docId, ...newTask }]);
        setTodos([...todos, { id: docId, ...newTask }]);
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
  const editTask = async (newContent, id) => {
    if (!id) {
        console.error("❌ Error: No se puede actualizar la tarea, ID es undefined.");
        return;
    }

    if (!newContent) {
        console.error("❌ Error: No se puede actualizar, contenido vacío.");
        return;
    }

    await updateDataFirestore(COLLECTION_NAME, id, { content: newContent, isEditing: false });

    setTodos(todos.map((todo) =>
        todo.id === id ? { ...todo, content: newContent, isEditing: false } : todo
    ));
};

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography.Title level={2}>To-Do List</Typography.Title>
      <TodoForm addTodo={addTodo} setTodos={setTodos} todos={todos} />
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