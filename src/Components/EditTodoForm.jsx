import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = () => {
    if (value.trim()) {
      editTodo(value, task.id);
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="inline">
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Update task" />
      <Button type="primary" htmlType="submit">Update</Button>
    </Form>
  );
};
