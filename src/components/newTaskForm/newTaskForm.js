import { useState } from 'react';

const NewTaskForm = (props) => {
  const [value, setValue] = useState('');

  const { placeholder, addItem } = props;

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (value.trim()) addItem(value);
    setValue('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input className="new-todo" placeholder={placeholder} onChange={inputChangeHandler} value={value} autoFocus />
    </form>
  );
};

export default NewTaskForm;
