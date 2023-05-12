import TasksFilter from '../tasksFilter/tasksFilter';

const Footer = (props) => {
  const { undoneCount, clearCompleted, changeFilter } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{undoneCount} items left</span>
      <TasksFilter changeFilter={changeFilter} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
