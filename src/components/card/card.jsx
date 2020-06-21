import React, { Component } from "react";
import "./card.css";
import Counter from "../counter/counter";
import TodoItem from "../todoitem/todo.item";

export default class Card extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      input: "",
      list: [],
    };

    this.updateInput = this.updateInput.bind(this);
    this.pushList = this.pushList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  updateInput(event) {
    this.setState({ input: event.target.value });
  }

  pushList() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.input],
      input: "",
      count: prevState.count + 1,
    }));

    this.props.onCreated();
  }

  handleDelete(index) {
    let list = [...this.state.list];
    list.splice(index, 1);

    this.setState((prevState) => ({
      list: list,
      count: prevState.count - 1,
    }));

    this.props.onDeleted();
  }

  render() {
    return (
      <div className="card-container">
        <h1>
          Todo List&nbsp;&nbsp;
          <span role="img" aria-label="fire">
            🔥
          </span>
        </h1>
        <Counter count={this.state.count}></Counter>
        <div className="input-btn-container">
          <input
            className="card-input"
            placeholder="insert a value.."
            onChange={this.updateInput}
            value={this.state.input}
          ></input>
          {this.state.input ? (
            <button className="submit-btn" onClick={this.pushList}>
              Save&nbsp;&nbsp;&nbsp;
              <span role="img" aria-label="light">
                💡
              </span>
            </button>
          ) : null}
        </div>
        <ul className="todo-list">
          {this.state.list.map((item, index) => (
            <TodoItem
              key={index}
              text={item}
              onDeletion={() => {
                this.handleDelete(index);
              }}
            ></TodoItem>
          ))}
        </ul>
      </div>
    );
  }
}
