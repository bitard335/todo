import { Component } from "react";
import PropTypes from "prop-types"

export default class TasksFilter extends Component {
  state = {
    activeIndex: 0,
  };

  static propTypes = {
    changeFilter: PropTypes.func.isRequired
  }

  render() {
    let { activeIndex } = this.state;
    const { changeFilter } = this.props;
    let handleChangeFilter = (item, index) => {
      let filter = item.toLowerCase();
      changeFilter(filter);
      this.setState({
        activeIndex: index,
      });
    };

    const items = ["All", "Active", "Done"];
    const listElements = items.map((item, index) => {
      return (
        <li key={index}>
          <button
            className={activeIndex === index ? "selected" : ""}
            onClick={() => handleChangeFilter(item, index)}
          >
            {item}
          </button>
        </li>
      );
    });

    return <ul className="filters">{listElements}</ul>;
  }
}
