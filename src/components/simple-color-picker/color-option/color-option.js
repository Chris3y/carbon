import React from 'react';

import Input from './../../../utils/decorators/input';
import Icon from './../../icon';
import classNames from 'classnames';
import { trim } from 'lodash';

/**
 * A single square with a color, implemented as a radio button.
 */
const ColorOption = Input(
class ColorOption extends React.Component {
  static propTypes = {
    // the value of the color that is represented by this ColorOption.
    color: React.PropTypes.string,
    // the input name.
    name: React.PropTypes.string,
    // called when the user selects or deselects this color option.
    onChange: React.PropTypes.func,
    // determines if this color option is selected or unselected.
    checked: React.PropTypes.bool
  }

  get inputProps() {
    return {
      className: this.inputClasses,
      onChange: this.props.onChange,
      checked: this.props.checked,
      name: this.props.name,
      type: "radio",
      value: this.props.color
    };
  }

  get colorSampleClasses() {
    let color = trim(this.props.color, '#');
    return classNames('carbon-color-option__color-sample', `carbon-color-option__color-sample--${color}`);
  }

  get tickedIcon() {
    return <Icon type='tick' className="carbon-color-option__tick"/>;
  }

  get colorSampleBox() {
    let style = { backgroundColor: this.props.color };

    return (
      <div className={ this.colorSampleClasses } style={ style }>
        { this.tickedIcon }
      </div>
    );
  }

  get additionalInputContent() {
    return this.colorSampleBox;
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'carbon-color-option__radio-button-input';
  }

  get mainClasses() {
    return classNames (
      'carbon-color-option',
      this.props.className
    );
  }

  render() {
    return (
      <li className={ this.mainClasses }>
        { this.inputHTML }
      </li>
    );
  }

});

export default ColorOption;
