import React, { Component } from "react";
import "./todo.item.css";

export default class TodoItem extends Component {
  render() {
    return (
      <div className="item-container">
        <h3>{this.props.text}</h3>
        <div className="side-btn">
          <button className="delete-btn" onClick={this.props.onDeletion}>
            <span role="img" aria-label="delete">
              ❌
            </span>
          </button>
        </div>
      </div>
    );
  }
}
