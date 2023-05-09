import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    date: new Date(),
    completed: false,
    label: 'Задача',
  };
  static propTypes = {
    changeCompleted: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    showEdit: PropTypes.func.isRequired,
    id: PropTypes.number,
    completed: PropTypes.bool,
    label: PropTypes.string,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({});
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { id, completed, label, date, timerId, timeSpended } = this.props;
    const { changeCompleted, removeItem, showEdit, setTimerId, updateTime } = this.props;

    const timeHours = Math.trunc(timeSpended / 3600);
    const timeMinutes = Math.trunc((timeSpended - timeHours * 3600) / 60);
    const timeSeconds = Math.trunc(timeSpended - timeMinutes * 60 - timeHours * 3600);
    const formattedTime = `${timeHours}:${timeMinutes}:${timeSeconds}`;

    const timeFromCreation = formatDistanceToNow(date, {
      includeSeconds: true,
      locale: ru,
    });
    const removeHandler = (evt) => {
      if (evt.target.matches('.icon-destroy')) {
        removeItem(id);
      }
    };
    const playHandler = () => {
      if (!timerId) {
        let time = timeSpended;
        const spendedTimerId = setInterval(() => {
          time++;
          updateTime(id, time);
        }, 1000);
        setTimerId(id, spendedTimerId);
      }
    };
    const stopHandler = () => {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(id, null);
      }
    };
    const completedHandler = () => {
      changeCompleted(id, !completed);
    };
    const showEditHandler = () => {
      showEdit(id, true);
    };

    return (
      <div className="view" onClick={removeHandler}>
        <input className="toggle" type="checkbox" onChange={completedHandler} checked={this.props.completed} />
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
  }
}
