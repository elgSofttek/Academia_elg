import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import {
    collection,
    addDoc,
    getFirestore,
    serverTimestamp,
}from 'firebase/firestore';
import firebaseElg from '../Config/firebaseConfig';
import { getAuth,onAuthStateChanged } from 'firebase/auth';



export const TodoForm = ({ addTodo, setTodos, todos }) => {
  const db = getFirestore(firebaseElg);
  const [value, setValue] = useState('');
  const auth=getAuth();

  const handleSubmit = async () => {
    if (!value.trim()) return; 

    const data = {
      "creatorName" : auth.currentUser.displayName,
      "content": value,
      "createdAt": "03-09-2025",
      "creatorEmail":auth.currentUser.email,
      "creatorId":" ",
      "creatorName": auth.currentUser.displayName,
      "tasks":value,
    }

    const docRef = await addDoc(collection(db, "tasks"), data);
    setTodos([...todos, data]);
    setValue(''); 
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
