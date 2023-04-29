import { Component } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../newTaskForm/newTaskForm';

export default class Header extends Component {
  static defaultProps = {
    title: 'Todos',
  };
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    const { title, addItem, placeholder } = this.props;
    return (
      <header className="header">
        <h1>{title}</h1>
        <NewTaskForm placeholder={placeholder} addItem={addItem} />
      </header>
    );
  }
}
