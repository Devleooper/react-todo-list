import React from "react";
import App from "../src/components/App";
import renderer from "react-test-renderer";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AnimatedText from "../src/components/animated/text/animated.text";

configure({ adapter: new Adapter() });
it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should change ui and state on added item", () => {
  const app = shallow(<App />);

  const animatePlusSpy = jest.spyOn(app.instance(), "animatePlus");
  const plusAnimationEndSpy = jest.spyOn(
    app.instance(),
    "handlePlusAnimationEnd"
  );
  app.instance().animatePlus();
  expect(animatePlusSpy).toHaveBeenCalled();
  expect(app.find("div.right")).toHaveLength(1);
  expect(app.find(AnimatedText).length).toBe(1);
  expect(app.state("animatePlus")).toEqual(true);
  app.find("div.right").first().simulate("animationEnd");
  expect(plusAnimationEndSpy).toHaveBeenCalled();
  expect(app.state("animatePlus")).toEqual(false);
});

it("should change ui and state on deleted item", () => {
  const app = shallow(<App />);

  const animateMinusSpy = jest.spyOn(app.instance(), "animateMinus");
  const minusAnimationEndSpy = jest.spyOn(
    app.instance(),
    "handleMinusAnimationEnd"
  );
  app.instance().animateMinus();
  expect(animateMinusSpy).toHaveBeenCalled();
  expect(app.find("div.left")).toHaveLength(1);
  expect(app.find(AnimatedText).length).toBe(1);
  expect(app.state("animateMinus")).toEqual(true);
  app.find("div.left").first().simulate("animationEnd");
  expect(minusAnimationEndSpy).toHaveBeenCalled();
  expect(app.state("animatePlus")).toEqual(false);
});
