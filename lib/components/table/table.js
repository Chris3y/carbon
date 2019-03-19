"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TableRow", {
  enumerable: true,
  get: function get() {
    return _tableRow.default;
  }
});
Object.defineProperty(exports, "TableCell", {
  enumerable: true,
  get: function get() {
    return _tableCell.default;
  }
});
Object.defineProperty(exports, "TableHeader", {
  enumerable: true,
  get: function get() {
    return _tableHeader.default;
  }
});
Object.defineProperty(exports, "TableSubheader", {
  enumerable: true,
  get: function get() {
    return _tableSubheader.default;
  }
});
Object.defineProperty(exports, "DraggableTableCell", {
  enumerable: true,
  get: function get() {
    return _draggableTableCell.default;
  }
});
exports.Table = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CSSTransitionGroup = _interopRequireDefault(require("react-transition-group/CSSTransitionGroup"));

var _classnames = _interopRequireDefault(require("classnames"));

var _immutable = _interopRequireDefault(require("immutable"));

var _i18nJs = _interopRequireDefault(require("i18n-js"));

var _actionToolbar = _interopRequireDefault(require("../action-toolbar"));

var _icon = _interopRequireDefault(require("../icon"));

var _link = _interopRequireDefault(require("../link"));

var _tableRow = _interopRequireDefault(require("./table-row"));

var _tableCell = _interopRequireDefault(require("./table-cell"));

var _tableHeader = _interopRequireDefault(require("./table-header"));

var _tableSubheader = _interopRequireDefault(require("./table-subheader"));

var _draggableTableCell = _interopRequireDefault(require("./draggable-table-cell"));

var _pager = _interopRequireDefault(require("../pager"));

var _spinner = _interopRequireDefault(require("../spinner"));

require("./table.scss");

require("./table--secondary-theme.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A Table widget.
 *
 * == How to use a Table in a component:
 *
 * In your file:
 *
 *   import { Table, TableRow, TableCell, TableHeader } from 'carbon-react/lib/components/table';
 *
 * To render a Table:
 *
 *   // map data to table rows
 *   let tableRows = (
 *     this.props.data.map((datum, key) => {
 *       return (
 *         <TableRow>
 *           <TableCell>
 *             { datum.firstName }
 *           </TableCell>
 *
 *           <TableCell>
 *             { datum.lastName }
 *           </TableCell>
 *         </TableRow>
 *       );
 *     });
 *   );
 *
 *   // prepend array of rows with a header row
 *   tableRows.unshift(
 *     <TableRow>
 *       <TableHeader>First Name</TableHeader>
 *       <TableHeader>Last Name</TableHeader>
 *     </TableRow>
 *   );
 *
 *   // render the table with the table rows
 *   <Table>
 *     { tableRows }
 *   </Table>
 *
 * == Pagination
 *
 * To add a pagination footer to the table you will need to pass some extra props to the table
 *
 *  let sizeOptions = Immutable.fromJS([{ id: '10', name: 10 }, { id: '25', name: 25 }, { id: '50', name: 50 }]),
 *
 * <Table
 *   paginate={ true }                        // Show the pagination footer
 *   currentPage='1'                          // Required - Current visible page
 *   pageSize='10'                            // Required - Number of records to show per page
 *   totalRecords                             // Required - Total number of records
 *   showPageSizeSelection={ false }          // Options  - Show page size selection
 *   pageSizeSelectionOptions={ sizeOptions } // Optional - Page Size Options
 *   thead={ TableRow }                       // Optional - A TableRow to be wrapped in <thead>
 * />
 *
 * == Sorting
 *
 *  To enable column sorting, you will need to configure the Table Header component.
 * See the Table Header component documentation.
 *
 * @class Table
 * @constructor
 */
var Table =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Table)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedCount: 0
      /**
       * Returns table object to child components.
       *
       * @method getChildContext
       * @return {void}
       */

    });

    _defineProperty(_assertThisInitialized(_this), "getChildContext", function () {
      return {
        attachActionToolbar: _this.attachActionToolbar,
        detachActionToolbar: _this.detachActionToolbar,
        attachToTable: _this.attachToTable,
        detachFromTable: _this.detachFromTable,
        checkSelection: _this.checkSelection,
        highlightRow: _this.highlightRow,
        onSort: _this.onSort,
        highlightable: _this.props.highlightable,
        selectable: _this.props.selectable,
        selectAll: _this.selectAll,
        selectRow: _this.selectRow,
        sortedColumn: _this.sortedColumn,
        sortOrder: _this.sortOrder
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onSort", function (sortedColumn, sortOrder) {
      var options = _this.emitOptions();

      options.sortedColumn = sortedColumn;
      options.sortOrder = sortOrder;

      _this.emitOnChangeCallback('table', options);
    });

    _defineProperty(_assertThisInitialized(_this), "onPagination", function (currentPage, pageSize, element) {
      if (_this.props.onPageSizeChange && element === 'size') {
        _this.props.onPageSizeChange(pageSize);
      }

      var options = _this.emitOptions();

      options.currentPage = currentPage;
      options.pageSize = pageSize;

      _this.emitOnChangeCallback('pager', options);
    });

    _defineProperty(_assertThisInitialized(_this), "emitOnChangeCallback", function (element, options) {
      if (_this.selectAllComponent) {
        // reset the select all component
        _this.selectAllComponent.setState({
          selected: false
        });

        _this.selectAllComponent = null;
      }

      _this.props.onChange(element, options);
    });

    _defineProperty(_assertThisInitialized(_this), "attachActionToolbar", function (comp) {
      _this.actionToolbarComponent = comp;
    });

    _defineProperty(_assertThisInitialized(_this), "detachActionToolbar", function () {
      _this.actionToolbarComponent = null;
    });

    _defineProperty(_assertThisInitialized(_this), "attachToTable", function (id, row) {
      _this.rows[id] = row;
    });

    _defineProperty(_assertThisInitialized(_this), "detachFromTable", function (id) {
      delete _this.rows[id];
    });

    _defineProperty(_assertThisInitialized(_this), "refresh", function () {
      _this.resetHighlightedRow();

      _this.selectedRows = {};

      if (_this.actionToolbarComponent) {
        _this.actionToolbarComponent.setState({
          total: 0,
          selected: []
        });
      }

      for (var key in _this.rows) {
        var _row = _this.rows[key];

        _row.setState({
          selected: false
        });
      }

      _this.emitOnChangeCallback('refresh', _this.emitOptions());
    });

    _defineProperty(_assertThisInitialized(_this), "resetHighlightedRow", function () {
      if (_this.highlightedRow.row && _this.rows[_this.highlightedRow.row.rowID]) {
        _this.highlightedRow.row.setState({
          highlighted: false
        });
      }

      _this.highlightedRow = {
        id: null,
        row: null
      };
    });

    _defineProperty(_assertThisInitialized(_this), "highlightRow", function (id, row) {
      var state = true;

      if (_this.highlightedRow.id !== null) {
        if (id === _this.highlightedRow.id) {
          // is the same row - toggle the current state
          state = !row.state.highlighted;
        } else {
          // is a different row - reset the old row
          _this.resetHighlightedRow();
        }
      } // set state of the highlighted row


      row.setState({
        highlighted: state
      }); // update the current highlighted row

      _this.highlightedRow = {
        id: id,
        row: row
      };

      if (_this.props.onHighlight) {
        // trigger onHighlight event
        _this.props.onHighlight(id, state, row);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectRow", function (id, row, state, skipCallback) {
      var isSelected = _this.selectedRows[id] !== undefined; // if row state has not changed - return early

      if (state === isSelected) {
        return;
      }

      if (_this.selectAllComponent) {
        // if there is a select all component, reset it
        _this.selectAllComponent.setState({
          selected: false
        });

        _this.selectAllComponent = null;
      }

      if (!state && isSelected) {
        // if unselecting the row, delete it from the object
        delete _this.selectedRows[id];
      } else if (!row.props.selectAll) {
        // add current row to the list of selected rows
        _this.selectedRows[id] = row;
      } // set new state for the row


      row.setState({
        selected: state
      });

      if (_this.actionToolbarComponent && !skipCallback) {
        var keys = Object.keys(_this.selectedRows); // update action toolbar

        _this.actionToolbarComponent.setState({
          total: keys.length,
          selected: _this.selectedRows
        });
      }

      if (_this.props.onSelect && !skipCallback) {
        // trigger onSelect event
        _this.props.onSelect(_this.selectedRows);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectAll", function (row) {
      var selectState = !row.state.selected;

      for (var key in _this.rows) {
        // update all the rows with the new state
        var _row = _this.rows[key];

        if (_row.shouldHaveMultiSelectColumn) {
          _this.selectRow(_row.props.uniqueID, _row, selectState, true);
        }
      } // update the row with the new state


      row.setState({
        selected: selectState
      }); // if select state is true, track the select all component

      _this.selectAllComponent = selectState ? row : null;

      if (_this.actionToolbarComponent) {
        var keys = Object.keys(_this.selectedRows); // update action toolbar

        _this.actionToolbarComponent.setState({
          total: keys.length,
          selected: _this.selectedRows
        });
      }

      if (_this.props.onSelect) {
        // trigger onSelect event
        _this.props.onSelect(_this.selectedRows);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "checkSelection", function (id, row) {
      var isSelected = _this.selectedRows[id] !== undefined,
          isHighlighted = _this.highlightedRow.id === id;

      if (isSelected !== row.state.selected) {
        row.setState({
          selected: isSelected
        });
      }

      if (isHighlighted !== row.state.highlighted) {
        row.setState({
          highlighted: isHighlighted
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectAllComponent", null);

    _defineProperty(_assertThisInitialized(_this), "actionToolbarComponent", null);

    _defineProperty(_assertThisInitialized(_this), "selectedRows", {});

    _defineProperty(_assertThisInitialized(_this), "highlightedRow", {
      id: null,
      row: null
    });

    _defineProperty(_assertThisInitialized(_this), "rows", {});

    _defineProperty(_assertThisInitialized(_this), "tableHeight", 0);

    _defineProperty(_assertThisInitialized(_this), "emitOptions", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var currentPage = props.currentPage || '';

      if (Number(props.currentPage) > Number(props.pageSize)) {
        currentPage = '1';
      }

      return {
        // What if paginate if false - think about when next change functionality is added
        currentPage: currentPage,
        filter: props.filter ? props.filter.toJS() : {},
        pageSize: props.pageSize || '',
        sortOrder: props.sortOrder || '',
        sortedColumn: props.sortedColumn || ''
      };
    });

    _defineProperty(_assertThisInitialized(_this), "configureLink", function (onConfigure) {
      if (!onConfigure) {
        return null;
      }

      return _react.default.createElement("div", {
        className: "carbon-table__configure-link"
      }, _react.default.createElement(_link.default, {
        href: "#",
        onClick: onConfigure
      }, _react.default.createElement(_icon.default, {
        type: "settings"
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "dataState", function () {});

    return _this;
  }

  _createClass(Table, [{
    key: "componentDidMount",

    /**
     * Lifecycle for after mounting
     * Resize the table to set the correct height on pageload
     *
     * @method componentDidMount
     * @return {Void}
     */
    value: function componentDidMount() {
      this.resizeTable();
    }
    /**
     * Lifecycle for after a update has happened
     * If filter has changed then emit the on change event.
     *
     * @method componentWillReceiveProps
     * @return {Void}
     */

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // if filter has changed, update the data
      if (!_immutable.default.is(this.props.filter, nextProps.filter)) {
        this.emitOnChangeCallback('filter', this.emitOptions(nextProps));
      }

      if (this.props.highlightable && nextProps.highlightable === false) {
        this.resetHighlightedRow();
      }

      if (this.props.selectable && nextProps.selectable === false) {
        for (var key in this.rows) {
          // update all the rows with the new state
          var row = this.rows[key];
          this.selectRow(row.props.uniqueID, row, false);
        }

        this.selectedRows = {};
      }
    }
    /**
     * Lifecycle for after a update has happened
     * If pageSize has updated to a smaller value - reset table height
     * else resize table
     *
     * @method componentDidUpdate
     * @return {Void}
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.shouldResetTableHeight(prevProps)) {
        this.resetTableHeight();
      } else {
        this.resizeTable();
      }
    }
    /**
     * Handles what happens on sort.
     *
     * @method onSort
     * @param {String} sortedColumn
     * @param {String} sortOrder
     */

  }, {
    key: "resetTableHeight",

    /**
     * Reset the minHeight and tableHeight of the table
     *
     * @method resetTableHeight
     * @return {Void}
     */
    value: function resetTableHeight() {
      var _this2 = this;

      this._wrapper.style.minHeight = '0';
      this.tableHeight = 0;
      setTimeout(function () {
        _this2.resizeTable();
      }, 0);
    }
    /**
     * Increase the minheight of the table if the new height
     * is greater than the previous
     *
     * @method resizeTable
     * @return {Void}
     */

  }, {
    key: "resizeTable",
    value: function resizeTable() {
      if (!this._table) {
        return;
      }

      var shrink = this.props.shrink && this._table.offsetHeight < this.tableHeight;

      if (shrink || this._table.offsetHeight > this.tableHeight) {
        this.tableHeight = this._table.offsetHeight;
        this._wrapper.style.minHeight = "".concat(this.tableHeight, "px");
      }
    }
    /**
     * Test if the table height should be reset to 0
     *
     * @method shouldResetTableHeight
     * @param prevProps - props before update
     * @return {Boolean}
     */

  }, {
    key: "shouldResetTableHeight",
    value: function shouldResetTableHeight(prevProps) {
      return prevProps.pageSize > this.pageSize;
    }
    /**
     * Tracks the component used for select all.
     *
     * @property selectAllComponent
     * @type {Object}
     */

  }, {
    key: "componentTags",

    /**
     * Data tags used for the data-component attribute
     */
    value: function componentTags(props) {
      return {
        'data-component': this.dataComponent,
        'data-element': props['data-element'],
        'data-role': props['data-role'],
        'data-state': this.dataState(),
        'aria-busy': this.state.ariaBusy
      };
    }
    /**
     * Returns the caption prop wrapped in a <caption> tag,
     * or null if no caption prop was given.
     *
     * @method caption
     * @return {Object} JSX
     */

  }, {
    key: "render",

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      var _this3 = this;

      var tableProps = {
        className: this.tableClasses
      };

      if (this.props['aria-describedby']) {
        tableProps['aria-describedby'] = this.props['aria-describedby'];
      }

      return _react.default.createElement("div", _extends({
        className: this.mainClasses
      }, this.componentTags(this.props)), this.actionToolbar, _react.default.createElement("div", {
        className: this.wrapperClasses,
        ref: function ref(wrapper) {
          _this3._wrapper = wrapper;
        }
      }, this.configureLink(this.props.onConfigure), _react.default.createElement("table", _extends({
        ref: function ref(table) {
          _this3._table = table;
        }
      }, tableProps), this.caption, this.thead, this.tbody)), this.pager);
    }
  }, {
    key: "sortedColumn",

    /**
     * Returns the currently sorted column.
     *
     * @method sortedColumn
     * @return {String}
     */
    get: function get() {
      return this.props.sortedColumn;
    }
    /**
     * Returns the current sort order.
     *
     * @method sortOrder
     * @return {String}
     */

  }, {
    key: "sortOrder",
    get: function get() {
      return this.props.sortOrder;
    }
    /**
     * Get pageSize for table
     *
     * @method pageSize
     * @return {String} table page size
     */

  }, {
    key: "pageSize",
    get: function get() {
      return this.props.pageSize;
    }
    /**
     * Emit onChange event with options
     * needed to fetch the new data
     *
     * @method emitOnChangeCallback
     * @param {String} element changed element
     * @param {Object} options base and updated options
     * @return {Void}
     */

  }, {
    key: "pagerProps",

    /**
     * Props to pass to pager component
     *
     * @method pagerProps
     * @return {Object} props
     */
    get: function get() {
      return {
        currentPage: this.props.currentPage,
        onPagination: this.onPagination,
        pageSize: this.defaultPageSize,
        pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
        showPageSizeSelection: this.props.showPageSizeSelection,
        totalRecords: this.props.totalRecords
      };
    }
    /**
     * Page size for page load
     *
     * @method defaultPageSize
     * @return {Void}
     */

  }, {
    key: "defaultPageSize",
    get: function get() {
      if (this.props.pageSize) {
        return this.props.pageSize;
      }

      if (this.props.pageSizeSelectionOptions) {
        return this.props.pageSizeSelectionOptions.first().get('id');
      }

      return '10';
    }
    /**
     * Returns the pager if paginate is true
     *
     * @method pager
     * @return {JSX} pager
     */

  }, {
    key: "pager",
    get: function get() {
      if (this.props.paginate) {
        return _react.default.createElement(_pager.default, this.pagerProps);
      }

      return null;
    }
    /**
     * Classes that apply to the parent table div
     *
     * @method mainClasses
     * @return {String}
     */

  }, {
    key: "mainClasses",
    get: function get() {
      return (0, _classnames.default)('carbon-table', this.props.className, "carbon-table--".concat(this.props.theme));
    }
    /**
     * Classes that apply to the table wrapper
     *
     * @method wrapperClasses
     * @return {String}
     */

  }, {
    key: "wrapperClasses",
    get: function get() {
      return (0, _classnames.default)('carbon-table__wrapper', this.props.className, {
        'carbon-table--pager': this.props.paginate,
        'carbon-table--configurable': this.props.onConfigure
      });
    }
    /**
     * Classes to apply to the table
     *
     * @method tableClasses
     * @return {String}
     */

  }, {
    key: "tableClasses",
    get: function get() {
      return 'carbon-table__table';
    }
    /**
     * Returns thead content wrapped in <thead>
     *
     * @method thead
     * @return {JSX}
     */

  }, {
    key: "thead",
    get: function get() {
      if (this.props.thead) {
        return _react.default.createElement("thead", {
          className: "carbon-table__header"
        }, this.props.thead);
      }

      return null;
    }
    /**
     * Returns the component for the action toolbar.
     *
     * @method actionToolbar
     * @return {JSX}
     */

  }, {
    key: "actionToolbar",
    get: function get() {
      if (!this.props.selectable || !this.props.actions) {
        return null;
      }

      return _react.default.createElement(_actionToolbar.default, {
        total: this.state.selectedCount,
        actions: this.props.actions
      }, this.props.actionToolbarChildren);
    }
  }, {
    key: "loadingRow",

    /**
     * Returns a row to be used for loading.
     *
     * @method loadingRow
     * @return {Object} JSX
     */
    get: function get() {
      return _react.default.createElement(_tableRow.default, {
        key: "__loading__",
        selectable: false,
        highlightable: false,
        hideMultiSelect: true
      }, _react.default.createElement(_tableCell.default, {
        colSpan: "42",
        align: "center"
      }, _react.default.createElement(_CSSTransitionGroup.default, {
        component: "div",
        transitionName: "table-loading",
        transitionEnterTimeout: 300,
        transitionLeaveTimeout: 300,
        transitionAppearTimeout: 300,
        transitionAppear: true
      }, _react.default.createElement(_spinner.default, {
        size: "small"
      }))));
    }
    /**
     * Returns a row to be used for no data.
     *
     * @method emptyRow
     * @return {Object} JSX
     */

  }, {
    key: "emptyRow",
    get: function get() {
      if (this.props.customEmptyRow) {
        return this.props.customEmptyRow;
      }

      return _react.default.createElement(_tableRow.default, {
        key: "__loading__",
        selectable: false,
        highlightable: false
      }, _react.default.createElement(_tableCell.default, {
        colSpan: "42",
        align: "center"
      }, _i18nJs.default.t('table.no_data', {
        defaultValue: 'No results to display'
      })));
    }
    /**
     * Works out what content to display in the table.
     *
     * @method tableContent
     * @return {Object} JSX
     */

  }, {
    key: "tableContent",
    get: function get() {
      var children = this.props.children,
          hasChildren = children; // if using immutable js we can count the children

      if (children && children.count) {
        var numOfChildren = children.count(),
            onlyChildIsHeader = numOfChildren === 1 && children.first().props.as === 'header';

        if (onlyChildIsHeader) {
          if (this._hasRetreivedData) {
            // if already retreived data then show empty row
            children = children.push(this.emptyRow);
          } else {
            // if not yet retreived data then show loading row
            children = children.push(this.loadingRow);
          }
        } else {
          // check if there actually are any children
          hasChildren = numOfChildren > 0;
        }
      }

      if (hasChildren) return children;
      if (this._hasRetreivedData) return this.emptyRow;
      return this.loadingRow;
    }
    /**
     * Returns the content, wrapped in a tbody.
     *
     * @method tbody
     * @return {Object} JSX
     */

  }, {
    key: "tbody",
    get: function get() {
      if (this.props.tbody === false) {
        return this.tableContent;
      }

      return _react.default.createElement("tbody", null, this.tableContent);
    }
    /**
     * Placeholder function for defining the data state, intended to be overriden in subclasses
     */

  }, {
    key: "dataComponent",

    /**
     * The name used for the data-component attribute
     */
    get: function get() {
      return 'table';
    }
  }, {
    key: "caption",
    get: function get() {
      if (this.props.caption) {
        return _react.default.createElement("caption", {
          className: "carbon-table__caption"
        }, this.props.caption);
      }

      return null;
    }
  }]);

  return Table;
}(_react.default.Component);

exports.Table = Table;

_defineProperty(Table, "propTypes", {
  /**
   * The actions to display in the toolbar
   *
   * @property actions - each action is object with the action attributes
   * @type {Object}
   */
  actions: _propTypes.default.object,

  /**
   * The extra actions to display in the toolbar
   *
   * @property actionToolbarChildren - additional buttons can be added to the tool bar
   * @type {Function}
   */
  actionToolbarChildren: _propTypes.default.func,

  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes.default.node,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes.default.string,

  /**
   * Custom empty row
   *
   * @property customEmptyRow
   * @type {Object}
   */
  customEmptyRow: _propTypes.default.node,

  /**
   * Data used to filter the data
   *
   * @property filter
   * @type {Object}
   */
  filter: _propTypes.default.object,

  /**
   * Emitted when table component changes e.g.
   * Pager, sorting, filter
   *
   * @property onChange
   * @type {Function}
   */
  onChange: _propTypes.default.func,

  /**
   * Enable configure icon that triggers this callback on click
   *
   * @property onConfigure
   * @type {Function}
   */
  onConfigure: _propTypes.default.func,

  /**
   * Show the pagination footer
   *
   * @property paginate
   * @type {Boolean}
   */
  paginate: _propTypes.default.bool,

  /**
   * Pagination
   * Current Visible Page
   *
   * @property currentPage
   * @type {String}
   */
  currentPage: _propTypes.default.string,

  /**
   * Pagination
   * Page Size of grid (number of visible records)
   *
   * @property pageSize
   * @type {String}
   */
  pageSize: _propTypes.default.string,

  /**
   * Pagination
   * Options for pageSize default - 10, 25, 50
   *
   * @property pageSizeSelectionOptions
   * @type {Object} Immutable
   */
  pageSizeSelectionOptions: _propTypes.default.object,

  /**
   * Pagination
   * Is the page size dropdown visible
   *
   * @property showPageSizeSelection
   * @type {Boolean}
   */
  showPageSizeSelection: _propTypes.default.bool,

  /**
   * Enables multi-selectable table rows.
   *
   * @property selectable
   * @type {Boolean}
   */
  selectable: _propTypes.default.bool,

  /**
   * Enables highlightable table rows.
   *
   * @property highlightable
   * @type {Boolean}
   */
  highlightable: _propTypes.default.bool,

  /**
   * A callback for when a row is selected.
   *
   * @property onSelect
   * @type {Function}
   */
  onSelect: _propTypes.default.func,

  /**
   * A callback for when a row is highlighted.
   *
   * @property onHighlight
   * @type {Function}
   */
  onHighlight: _propTypes.default.func,

  /**
   * A callback for when the page size changes.
   *
   * @property onPageSizeChange
   * @type {Function}
   */
  onPageSizeChange: _propTypes.default.func,

  /**
   * Pagination
   * Total number of records in the grid
   *
   * @property totalRecords
   * @type {String}
   */
  totalRecords: _propTypes.default.string,

  /**
   * Allow table to shrink in size.
   *
   * @property shrink
   * @type {Boolean}
   */
  shrink: _propTypes.default.bool,

  /**
   * The currently sorted column.
   *
   * @property sortedColumn
   * @type {String}
   */
  sortedColumn: _propTypes.default.string,

  /**
   * The current sort order applied.
   *
   * @property sortOrder
   * @type {String}
   */
  sortOrder: _propTypes.default.string,

  /**
   * TableRows to be wrapped in <thead>
   *
   * @property thead
   * @type {Object}
   */
  thead: _propTypes.default.object,

  /**
   * Determines if you want the table to automatically render a tbody.
   *
   * @property tbody
   * @type {Object}
   */
  tbody: _propTypes.default.bool,

  /**
   * A string to render as the table's caption
   *
   * @property caption
   * @type string
   */
  caption: _propTypes.default.string,

  /**
   * The HTML id of the element that contains a description
   * of this table.
   *
   * @property aria-describedby
   * @type string
   */
  'aria-describedby': _propTypes.default.string,

  /**
   * Renders as light or dark
   * Uses common theme definition of 'primary' (dark, default) and 'secondary' (light)
   *
   * @property theme
   * @type string
   */
  theme: _propTypes.default.string
});

_defineProperty(Table, "childContextTypes", {
  /**
   * Defines a context object for child components of the table component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property childContextTypes
   * @type {Object}
   */
  attachActionToolbar: _propTypes.default.func,
  // tracks the action toolbar component
  detachActionToolbar: _propTypes.default.func,
  // tracks the action toolbar component
  attachToTable: _propTypes.default.func,
  // attach the row to the table
  checkSelection: _propTypes.default.func,
  // a function to check if the row is currently selected
  detachFromTable: _propTypes.default.func,
  // detach the row from the table
  highlightRow: _propTypes.default.func,
  // highlights the row
  selectable: _propTypes.default.bool,
  // table can enable all rows to be multi-selectable
  onSort: _propTypes.default.func,
  // a callback function for when a sort order is updated
  selectAll: _propTypes.default.func,
  // a callback function for when all visible rows are selected
  selectRow: _propTypes.default.func,
  // a callback function for when a row is selected
  highlightable: _propTypes.default.bool,
  // table can enable all rows to be highlightable
  sortOrder: _propTypes.default.string,
  // the current sort order applied
  sortedColumn: _propTypes.default.string // the currently sorted column

});

_defineProperty(Table, "defaultProps", {
  theme: 'primary'
});