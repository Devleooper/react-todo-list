import React from "react";
import renderer from "react-test-renderer";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "../src/components/card/card";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const card = renderer.create(<Card />).toJSON();
  expect(card).toMatchSnapshot();
});

it("should show button on card input", () => {
  const card = shallow(<Card />);

  const mockEvent = {
    target: {
      value: "this is a test item",
    },
  };
  card.instance().updateInput(mockEvent);
  expect(card.state("input")).toBe("this is a test item");
  expect(card.find(".submit-btn")).toHaveLength(1);
});

it("should add item correctly", () => {
  const createdMockFn = jest.fn();
  const card = shallow(<Card onCreated={createdMockFn} />);
  const mockEvent = {
    target: {
      value: "this is a test item",
    },
  };
  card.instance().updateInput(mockEvent);
  expect(card.state("input")).toBe("this is a test item");
  expect(card.find(".submit-btn")).toHaveLength(1);
  card.instance().pushList();
  expect(card.state("list")).toEqual(["this is a test item"]);
  expect(card.state("input")).toBe("");
  expect(card.state("count")).toBe(1);
  expect(card.find(".todo-list").children()).toHaveLength(1);
  expect(createdMockFn).toHaveBeenCalled();
});

it("should delete item correctly", () => {
  const createdMockFn = jest.fn();
  const deletedMockFn = jest.fn();
  const card = shallow(
    <Card onCreated={createdMockFn} onDeleted={deletedMockFn} />
  );
  const mockEvent = {
    target: {
      value: "this is a test item",
    },
  };
  card.instance().updateInput(mockEvent);
  expect(card.state("input")).toBe("this is a test item");
  expect(card.find(".submit-btn")).toHaveLength(1);
  card.instance().pushList();
  expect(card.state("list")).toEqual(["this is a test item"]);
  expect(card.state("input")).toBe("");
  expect(card.state("count")).toBe(1);
  expect(card.find(".todo-list").children()).toHaveLength(1);
  expect(createdMockFn).toHaveBeenCalled();
  card.instance().handleDelete();
  expect(card.state("list")).toEqual([]);
  expect(card.state("count")).toBe(0);
  expect(card.find(".todo-list").children()).toHaveLength(0);
  expect(deletedMockFn).toHaveBeenCalled();
});
