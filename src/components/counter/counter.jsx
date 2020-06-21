import React, { Component } from "react";

export default class Counter extends Component {
  render() {
    return <h3> you have inserted {this.props.count} items </h3>;
  }
}
