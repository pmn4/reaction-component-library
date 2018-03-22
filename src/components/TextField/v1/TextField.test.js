import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { testInput } from "composable-form-tests";
import TextField from "./TextField";

testInput({
  component: TextField,
  defaultValue: null,
  exampleValueOne: "ONE",
  exampleValueTwo: "TWO",
  mount,
  simulateChanging(wrapper, value) {
    wrapper.find('input').simulate('change', { target: { value } });
  },
  simulateChanged(wrapper, value) {
    wrapper.find('input').simulate('blur', { target: { value } });
  },
  simulateSubmit(wrapper) {
    wrapper.find('input').simulate('keypress', { which: 13 });
  }
});

test("renders", () => {
  const component = renderer.create(<TextField name="test" />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders with props", () => {
  const component = renderer.create(
    <TextField
      name="test"
      value="VALUE"
      placeholder="PLACEHOLDER"
      className="CLASSNAME"
      maxLength={20}
      isReadOnly
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders textarea", () => {
  const component = renderer.create(
    <TextField name="test" allowLineBreak />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders textarea with props", () => {
  const component = renderer.create(
    <TextField
      name="test"
      allowLineBreak
      value="VALUE"
      placeholder="PLACEHOLDER"
      className="CLASSNAME"
      maxLength={20}
      isReadOnly
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('getValue default trimming and null', () => {
  const wrapper = mount(<TextField name="test" value=" " />);
  expect(wrapper.instance().getValue()).toBeNull();
});

test('getValue with convertEmptyStringToNull false', () => {
  const wrapper = mount(<TextField name="test" convertEmptyStringToNull={false} />);
  expect(wrapper.instance().getValue()).toBe('');
});

test('getValue with trimValue false', () => {
  const wrapper = mount(<TextField name="test" trimValue={false} value=" " />);
  expect(wrapper.instance().getValue()).toBe(' ');
});