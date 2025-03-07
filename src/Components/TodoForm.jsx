import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      addTodo(value);
      setValue('');
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="inline">
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="What is the task today?" />
      <Button type="primary" htmlType="submit">Add Task</Button>
    </Form>
  );
};
