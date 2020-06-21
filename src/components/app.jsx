import React, { Component } from "react";
import "./app.css";
import Card from "./card/card";
import AnimatedText from "./animated/text/animated.text";

const textStyle = {
  color: "#282c34",
  fontSize: "36pt",
  textAlign: "center",
};

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      animatePlus: false,
      animateMinus: false,
    };

    this.animateMinus = this.animateMinus.bind(this);
    this.animatePlus = this.animatePlus.bind(this);
    this.handleMinusAnimationEnd = this.handleMinusAnimationEnd.bind(this);
    this.handlePlusAnimationEnd = this.handlePlusAnimationEnd.bind(this);
  }

  animatePlus() {
    this.setState((prevState) => ({
      animatePlus: true,
      animateMinus: prevState.animateMinus
        ? !prevState.animateMinus
        : prevState.animateMinus,
    }));
  }

  animateMinus() {
    this.setState((prevState) => ({
      animatePlus: prevState.animatePlus
        ? !prevState.animatePlus
        : prevState.animatePlus,
      animateMinus: true,
    }));
  }

  handleMinusAnimationEnd() {
    this.setState({ animateMinus: false });
  }

  handlePlusAnimationEnd() {
    this.setState({ animatePlus: false });
  }

  render() {
    let { animateMinus, animatePlus } = this.state;
    return (
      <div className="App">
        {animateMinus ? (
          <div
            className="animated-text-container left"
            onAnimationEnd={this.handleMinusAnimationEnd}
          >
            <AnimatedText style={textStyle} text={"-1"} />
          </div>
        ) : null}
        <Card
          className="card"
          onCreated={this.animatePlus}
          onDeleted={this.animateMinus}
        ></Card>
        {animatePlus ? (
          <div
            className="animated-text-container right"
            onAnimationEnd={this.handlePlusAnimationEnd}
          >
            <AnimatedText style={textStyle} text={"+1"} />
          </div>
        ) : null}
      </div>
    );
  }
}
