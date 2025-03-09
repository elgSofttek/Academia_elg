import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    if (!value.trim()) return; // 🔹 Evita agregar tareas vacías

    await addTodo(value); // 🔹 Asegura que Firestore procese la tarea antes de limpiar el input
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
