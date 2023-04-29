import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    date: new Date(),
    completed: false,
    label: 'Задача',
  };
  static propTypes = {
    date: PropTypes.instanceOf(Date),
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
    const { changeCompleted, removeItem, showEdit, id, completed, label, date } = this.props;

    const timePassed = formatDistanceToNow(date, {
      includeSeconds: true,
    });
    const removeHandler = (evt) => {
      if (evt.target.matches('.icon-destroy')) {
        removeItem(id);
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
          <span className="description">{label}</span>
          <span className="created">{timePassed}</span>
        </label>
        <button className="icon icon-edit" onClick={showEditHandler}></button>
        <button className="icon icon-destroy"></button>
      </div>
    );
  }
}
