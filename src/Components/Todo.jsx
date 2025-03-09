import React from 'react';
import { Button, List, Typography, Checkbox } from 'antd';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  // Verifica que createdAt esté definido antes de formatearlo
  const formattedDate = task.createdAt?.seconds 
    ? new Date(task.createdAt.seconds * 1000).toLocaleString() 
    : "Fecha desconocida";

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
          {task.task}
        </Typography.Text>
        <p style={{ margin: 0 }}>Creado: {formattedDate}</p>
        <p style={{ margin: 0 }}>Por: {task.creatorEmail || "Desconocido"}</p>
      </div>
    </List.Item>
  );
};

