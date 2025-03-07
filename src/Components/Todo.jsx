import React from 'react';
import { Button, List, Typography } from 'antd';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <List.Item
      actions={[
        <Button type="link" onClick={() => editTodo(task.id)}>Edit</Button>,
        <Button type="link" danger onClick={() => deleteTodo(task.id)}>Delete</Button>
      ]}
    >
      <Typography.Text
        delete={task.completed}
        onClick={() => toggleComplete(task.id)}
        style={{ cursor: 'pointer' }}
      >
        {task.task}
      </Typography.Text>
    </List.Item>
  );
};
