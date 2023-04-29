import { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }

  static defaultProps = {
    placeholder: "Что надо сделать?",
  }
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }

  render() {
    const { placeholder, addItem } = this.props;
    let { value } = this.state;

    const inputChangeHandler = (event) => {
      this.setState({ value: event.target.value });
    };
    const submitHandler = (event) => {
      event.preventDefault();
      if (value.trim()) addItem(value);
      this.setState({
        value: "",
      });
    };
    return (
      <form onSubmit={submitHandler}>
        <input
          className="new-todo"
          placeholder={placeholder}
          onChange={inputChangeHandler}
          value={value}
          autoFocus
        />
      </form>
    );
  }
}
