import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import {
    collection,
    addDoc,
    getFirestore,
}from 'firebase/firestore';
import firebaseElg from '../Config/firebaseConfig';

export const TodoForm = ({ addTodo, setTodos, todos }) => {
  const db = getFirestore(firebaseElg);
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    if (!value.trim()) return; // 🔹 Evita agregar tareas vacías

    const data = {
      "creatorName" : "Emiliano",
      "content": value,
      "createdAt": "03-09-2025",
      "creatorEmail":"e2002lara@gmail.com",
      "creatorId":"emiliano",
      "creatorName": "Emiliano",
      "tasks":value,
    }

    const docRef = await addDoc(collection(db, "tasks"), data);
    setTodos([...todos, data]);
    setValue(''); // 🔹 Limpia el input después de agregar la tarea
  };

  return (
    <Form onFinish={handleSubmit} layout="inline">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cuál es la tarea el día de hoy?"
      />
      <Button type="primary" htmlType="submit">
        Add Task
      </Button>
    </Form>
  );
};
