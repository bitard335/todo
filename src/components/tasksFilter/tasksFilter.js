const TasksFilter = (props) => {
  const { changeFilter } = props;
  const handleChangeFilter = (item) => {
    const filter = item.toLowerCase();
    changeFilter(filter);
  };

  const items = ['All', 'Active', 'Done'];
  const listElements = items.map((item, index) => {
    return (
      <li key={index}>
        <label>
          <input type="radio" name="filter" onChange={() => handleChangeFilter(item)} />
          <span>{item}</span>
        </label>
      </li>
    );
  });

  return <ul className="filters">{listElements}</ul>;
};

export default TasksFilter;
