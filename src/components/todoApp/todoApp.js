import { useState } from 'react';

import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';
import Header from '../header/header';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const filteredTodos = () => {
    return filter === 'all' ? todos : todos.filter((todo) => todo.completed);
  };

  const addItem = (value) => {
    const data = {
      label: value,
      completed: false,
      id: todos.length,
      date: Date.now(),
      edit: false,
      timeSpended: 0,
      timerId: null,
    };
    setTodos((todos) => [...todos, data]);
  };

  const edit = (arr, id, attr, value) => {
    const newArr = arr.map((todo) => {
      if (todo.id === id) return { ...todo, [attr]: value };
      return todo;
    });
    return newArr;
  };
  const editTodo = (id, value, attr) => {
    setTodos((todos) => edit(todos, id, attr, value));
  };
  const removeItem = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  const clearCompleted = () => {
    setTodos((todos) => todos.map((todo) => ({ ...todo, completed: false })));
  };

  const doneCount = todos.filter((el) => el.completed).length;
  const undoneCount = todos.length - doneCount;

  return (
    <div className="todoapp">
      <Header placeholder="Что надо сделать?" title="Todos" addItem={addItem} />

      <div className="main">
        <TaskList todos={filteredTodos()} editTodo={editTodo} removeItem={removeItem} clearCompleted={clearCompleted} />
        <Footer undoneCount={undoneCount} changeFilter={setFilter} clearCompleted={clearCompleted} />
      </div>
    </div>
  );
};

export default TodoApp;
