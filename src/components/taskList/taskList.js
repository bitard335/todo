import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
export default class TaskList extends Component {
  state = {
    value: '',
  };

  static defaultProps = {
    todos: [],
  };
  static propTypes = {
    todos: PropTypes.array,
    changeCompleted: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    showEdit: PropTypes.func.isRequired,
  };
  render() {
    const { value } = this.state;
    const { todos, changeCompleted, removeItem, editItem, showEdit, updateTime, setTimerId } = this.props;
    const elements = todos.map((item) => {
      let { id, completed, edit, ...rest } = item;
      let className = '';
      if (completed) className = 'completed';
      if (edit) className = 'editing';

      const inputChangeHandler = (event) => {
        this.setState({ value: event.target.value });
      };
      const submitHandler = (event) => {
        event.preventDefault();
        if (value.trim()) editItem(id, value);
        this.setState({
          value: '',
        });
        showEdit(id, false);
      };

      return (
        <li key={id} className={className}>
          <Task
            {...rest}
            id={id}
            completed={completed}
            changeCompleted={changeCompleted}
            removeItem={removeItem}
            showEdit={showEdit}
            updateTime={updateTime}
            setTimerId={setTimerId}
          />
          <form onSubmit={submitHandler}>
            <input type="text" className="edit" onChange={inputChangeHandler} value={this.state.value}></input>
          </form>
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
