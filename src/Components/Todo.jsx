import React from 'react';
import { Button, List, Typography, Checkbox } from 'antd';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  // 🔹 Verifica si `createdAt` es un timestamp válido antes de convertirlo
  const formattedDate = task.createdAt
  ? (task.createdAt.seconds 
      ? new Date(task.createdAt.seconds * 1000).toLocaleString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      : task.createdAt) // 🔹 Si es texto, simplemente lo muestra
  : "Sin fecha registrada";

  return (
    <List.Item
      actions={[
        <Button type="link" onClick={() => editTodo(task.id)}>Editar</Button>,
        <Button type="link" danger onClick={() => deleteTodo(task.id)}>Eliminar</Button>
      ]}
    >
      <Checkbox
        checked={task.completed}
        onChange={() => toggleComplete(task.id, task.completed)}
      />
      <div style={{ marginLeft: '10px' }}>
        <Typography.Text delete={task.completed} style={{ cursor: 'pointer' }}>
          {task.content||"Sin descripción"}
        </Typography.Text>
        <p style={{ margin: 0 }}>Creado: {formattedDate}</p>
        <p style={{ margin: 0 }}>Por: {task.creatorEmail || "Desconocido"}</p>
      </div>
    </List.Item>
  );
};

