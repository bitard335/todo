import NewTaskForm from '../newTaskForm/newTaskForm';

const Header = (props) => {
  const { title, addItem, placeholder } = props;

  return (
    <header className="header">
      <h1>{title}</h1>
      <NewTaskForm placeholder={placeholder} addItem={addItem} />
    </header>
  );
};

export default Header;
