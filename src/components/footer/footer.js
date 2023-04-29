import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasksFilter/tasksFilter';

export default class Footer extends Component {
  static defaultProps = {
    undoneCount: 0,
  };
  static propTypes = {
    undoneCount: PropTypes.number,
    clearCompleted: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
  };
  render() {
    let { undoneCount, clearCompleted, changeFilter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{undoneCount} items left</span>
        <TasksFilter changeFilter={changeFilter} />
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}
