import React from "react";
import renderer from "react-test-renderer";
import AnimatedText from "./../src/components/animated/text/animated.text";

it("should render correctly", () => {
  const tree = renderer.create(<AnimatedText />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render correctly with props", () => {
  const textStyle = {
    color: "#282c34",
    fontSize: "36pt",
    textAlign: "center",
  };
  const tree = renderer
    .create(<AnimatedText style={textStyle} text="+1" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
