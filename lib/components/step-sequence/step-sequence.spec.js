"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _stepSequence = require("./step-sequence");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<StepSequence />', function () {
  var stepSequence;
  beforeAll(function () {
    stepSequence = (0, _enzyme.shallow)(_react.default.createElement(_stepSequence.StepSequence, null, _react.default.createElement("div", null, "Children")));
  });
  test('basic render', function () {
    expect(stepSequence).toMatchSnapshot();
  });
});