import React from "react";
import renderer from "react-test-renderer";
import TodoItem from "../src/components/todoitem/todo.item";

it("renders correctly", () => {
  const item = renderer.create(<TodoItem />);
  expect(item.toJSON()).toMatchSnapshot();
});

it("renders correctly with text", () => {
  const item = renderer.create(<TodoItem text="this is a snapshot test" />);
  expect(item.toJSON()).toMatchSnapshot();
});
