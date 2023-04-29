import { Component } from "react";
import NewTaskForm from "../newTaskForm/newTaskForm";
import PropTypes from "prop-types";

export default class Header extends Component {
  static defaultProps = {
    title: "Todos",
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
