import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static propTypes = {
    changeFilter: PropTypes.func.isRequired,
  };

  render() {
    const { changeFilter } = this.props;
    let handleChangeFilter = (item, index) => {
      let filter = item.toLowerCase();
      changeFilter(filter);
      this.setState({
        activeIndex: index,
      });
    };

    const items = ['All', 'Active', 'Done'];
    const listElements = items.map((item, index) => {
      return (
        <li key={index}>
          <label>
            <input type="radio" name="filter" onChange={() => handleChangeFilter(item, index)} />
            <span>{item}</span>
          </label>
        </li>
      );
    });

    return <ul className="filters">{listElements}</ul>;
  }
}
