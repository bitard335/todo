import { Component } from 'react';

import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';
import Header from '../header/header';

export default class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: 'all',
    };
  }

  changeFilter = (value) => {
    this.setState({
      filter: value,
    });
  };

  filter() {
    const { filter, todos } = this.state;
    let filteredTodos;
    if (filter === 'all') {
      filteredTodos = todos;
    } else {
      filteredTodos =
        filter === 'done' ? todos.filter((todo) => todo.completed) : todos.filter((todo) => !todo.completed);
    }
    return filteredTodos;
  }

  addItem = (value) => {
    const data = {
      label: value,
      completed: false,
      id: this.state.todos.length,
      date: Date.now(),
      edit: false,
    };

    this.setState((state) => ({
      todos: [...state.todos, ...[data]],
    }));
  };

  edit = (arr, id, attr, value) => {
    const newArr = arr.map((todo) => {
      if (todo.id === id) return { ...todo, [attr]: value };
      return todo;
    });
    return newArr;
  };

  showEdit = (id, value) => {
    this.setState(({ todos }) => ({
      todos: this.edit(todos, id, 'edit', value),
    }));
  };

  editItem = (id, value) => {
    this.setState(({ todos }) => ({
      todos: this.edit(todos, id, 'label', value),
    }));
  };

  removeItem = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter((todo) => todo.id !== id),
    }));
  };

  changeCompleted = (id, value) => {
    this.setState(({ todos }) => ({
      todos: this.edit(todos, id, 'completed', value),
    }));
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        return { ...todo, completed: false };
      }),
    }));
  };

  render() {
    let { todos } = this.state;
    const filteredTodos = this.filter();
    let doneCount = todos.filter((el) => el.completed).length;
    let undoneCount = todos.length - doneCount;

    return (
      <div className="todoapp">
        <Header placeholder="What needs to be done?" title="Todos" addItem={this.addItem} />

        <div className="main">
          <TaskList
            todos={filteredTodos}
            showEdit={this.showEdit}
            editItem={this.editItem}
            removeItem={this.removeItem}
            changeCompleted={this.changeCompleted}
          />
          <Footer undoneCount={undoneCount} changeFilter={this.changeFilter} clearCompleted={this.clearCompleted} />
        </div>
      </div>
    );
  }
}
