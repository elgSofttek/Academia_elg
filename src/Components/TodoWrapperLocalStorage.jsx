import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { List, Typography } from 'antd';

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const editTask = (task, id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo)));
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography.Title level={2}>Get Things Done!</Typography.Title>
      <TodoForm addTodo={addTodo} />
      <List
        bordered
        dataSource={todos}
        renderItem={(todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo task={todo} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} />
          )
        }
      />
    </div>
  );
};
