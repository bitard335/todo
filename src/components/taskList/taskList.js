import { useState } from 'react';
import classNames from 'classnames';

import Task from '../task/task';

const TaskList = (props) => {
  const [value, setValue] = useState('');

  const { todos, removeItem, editTodo } = props;

  const elements = todos.map((item) => {
    let { id, completed, edit, ...rest } = item;
    const itemClassName = classNames({
      completed: completed,
      editing: edit,
    });

    const inputChangeHandler = (event) => {
      setValue(event.target.value);
    };
    const submitHandler = (event) => {
      event.preventDefault();
      if (value.trim()) editTodo(id, value, 'label');
      setValue('');
      editTodo(id, false, 'edit');
    };

    return (
      <li key={id} className={itemClassName}>
        <Task {...rest} id={id} removeItem={removeItem} editTodo={editTodo} />
        <form onSubmit={submitHandler}>
          <input type="text" className="edit" onChange={inputChangeHandler} value={value}></input>
        </form>
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
