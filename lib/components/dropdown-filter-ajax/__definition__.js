"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = _interopRequireDefault(require("./"));

var _optionsHelper = _interopRequireDefault(require("../../utils/helpers/options-helper"));

var _definition = _interopRequireDefault(require("./../../../demo/utils/definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition.default('dropdown-filter-ajax', _.default, {
  description: "Ajax control: Selects one option from a very long list, with the ability to filter and create new items.",
  designerNotes: "\n* This control is the same as [Dropdown Filter](/components/dropdown-filter), but uses Ajax.\n* Ajax loads data from a specified source as needed, rather than data in the page markup.\n ",
  hiddenProps: ['path', 'additionalRequestParams', 'formatResponse', 'formatRequest'],
  toggleFunctions: ['create'],
  propTypes: {
    options: "Object",
    cacheVisibleValue: "Boolean",
    formatResponse: 'Function',
    formatRequest: 'Function',
    value: "String",
    create: "Function",
    freetext: "Boolean",
    suggest: "Boolean",
    path: "String",
    rowsPerRequest: "String",
    visibleValue: "String",
    additionalRequestParams: "Object",
    withCredentials: "Boolean"
  },
  propValues: {
    path: '/countries'
  },
  propDescriptions: {
    cacheVisibleValue: "The dropdown will continually find the name during re-render, set this to true to only re-find the name if the value has actually changed.",
    formatResponse: 'Callback function for formatting the data received via Ajax requests into the format required by the table',
    formatRequest: 'Callback function for formatting the query data to be sent via Ajax to the defined path',
    options: "The options for the dropdown. This needs to be an Immutable Map.",
    value: "The currently selected value of the input.",
    create: "When defined will show a create button, which on click will trigger this callback with currently typed value.",
    freetext: "When enabled will allow the user to type freely into the field, without their filter having to match a result.",
    suggest: "When enabled will enforce that the user needs to type something before they will see any results.",
    path: "The path to make ajax requests to.",
    rowsPerRequest: "How many items to get per request.",
    visibleValue: "The visible value to display in the input.",
    additionalRequestParams: "Add additional params to the server request"
  }
});
definition.isAnInput();
var _default = definition;
exports.default = _default;