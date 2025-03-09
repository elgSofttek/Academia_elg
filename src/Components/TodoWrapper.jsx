import React, { useState, useEffect } from 'react';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';

import { EditTodoForm } from './EditTodoForm';
import { List, Typography } from 'antd';
import { addDataFirestore, readAllDataFirestore, deleteDataFirestore, updateDataFirestore } from '../Config/firestoreCalls';


const COLLECTION_NAME = "tasks"; // 🔹 Nombre de la colección en Firestore

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // ✅ Cargar tareas desde Firestore al montar el componente
  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await readAllDataFirestore(COLLECTION_NAME);
      console.log('Tareas obtenidas de firestore',fetchTodos)
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  // ✅ Agregar una tarea en Firestore
  const addTodo = async (todo) => {
    const newTask = { task: todo, completed: false, isEditing: false };
    const docId = await addDataFirestore(COLLECTION_NAME, newTask);
    setTodos([...todos, { id: docId, ...newTask }]);
  };

  // ✅ Marcar una tarea como completada en Firestore
  const toggleComplete = async (id, completed) => {
    await updateDataFirestore(COLLECTION_NAME, id, { completed: !completed });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  // ✅ Eliminar una tarea en Firestore
  const deleteTodo = async (id) => {
    await deleteDataFirestore(COLLECTION_NAME, id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✅ Habilitar modo edición en Firestore
  const editTodo = async (id, isEditing) => {
    await updateDataFirestore(COLLECTION_NAME, id, { isEditing: !isEditing });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  // ✅ Editar una tarea en Firestore
  const editTask = async (task, id) => {
    await updateDataFirestore(COLLECTION_NAME, id, { task, isEditing: false });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: false } : todo)));
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography.Title level={2}>¡To Do List!</Typography.Title>
      <TodoForm addTodo={addTodo} />
      <List
        bordered
        dataSource={todos}
        renderItem={(todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo task={todo} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={() => toggleComplete(todo.id, todo.completed)} />
          )
        }
      />
    </div>
  );
};

