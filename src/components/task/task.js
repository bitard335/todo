import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const Task = (props) => {
  const { id, completed, label, date, timerId, timeSpended } = props;
  const { editTodo, removeItem } = props;

  const timeHours = Math.trunc(timeSpended / 3600);
  const timeMinutes = Math.trunc((timeSpended - timeHours * 3600) / 60);
  const timeSeconds = Math.trunc(timeSpended - timeMinutes * 60 - timeHours * 3600);
  const formattedTime = `${timeHours}:${timeMinutes}:${timeSeconds}`;

  const timeFromCreation = formatDistanceToNow(date, {
    includeSeconds: true,
    locale: ru,
  });

  const removeHandler = (evt) => {
    if (evt.target.matches('.icon-destroy')) removeItem(id);
  };
  const playHandler = () => {
    if (!timerId) {
      let time = timeSpended;
      const spendedTimerId = setInterval(() => {
        time++;
        editTodo(id, time, 'timeSpended');
      }, 1000);
      editTodo(id, spendedTimerId, 'timerId');
    }
  };
  const stopHandler = () => {
    if (timerId) {
      clearInterval(timerId);
      editTodo(id, null, 'timerId');
    }
  };
  const completedHandler = () => {
    editTodo(id, !completed, 'completed');
  };
  const showEditHandler = () => {
    editTodo(id, true, 'edit');
  };

  return (
    <div className="view" onClick={removeHandler}>
      <input className="toggle" type="checkbox" onChange={completedHandler} checked={completed} />
      <label>
        <span className="title">{label}</span>
        <span className="description">
          <button className="icon icon-play" onClick={playHandler}></button>
          <button className="icon icon-pause" onClick={stopHandler}></button>
          <span className="timer">{formattedTime}</span>
        </span>
        <span className="created">{timeFromCreation} назад</span>
      </label>
      <button className="icon icon-edit" onClick={showEditHandler}></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};

export default Task;
