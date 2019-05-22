import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import Button from '../button';
import StyledSplitButton from './split-button.style';
import { StyledSplitButtonToggle } from './split-button-toggle.style';
import StyledSplitButtonChildrenContainer from './split-button-children.style';
import { validProps } from '../../utils/ether/ether';
import OptionsHelper from '../../utils/helpers/options-helper';
import Events from '../../utils/helpers/events';
import guid from '../../utils/helpers/guid';

class SplitButton extends Component {
  constructor(props) {
    super(props);
    this.buttonListId = guid();
    this.buttonLabelId = guid();
    this.componentTags = this.componentTags.bind(this);
    this.showButtons = this.showButtons.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.additionalButtons = [];
    this.listening = false;
  }

  state = {
    /**
     * Tracks whether the additional buttons should be visible.
     */
    showAdditionalButtons: false
  }

  /**
   * Shows the additional buttons.
   */
  showButtons() {
    this.setState({ showAdditionalButtons: true });
    if (!this.listening) {
      document.addEventListener('keydown', this.handleKeyDown);
      this.listening = true;
    }
  }

  /**
   * Hides additional buttons.
   */
  hideButtons() {
    this.setState({ showAdditionalButtons: false });
    if (this.listening) {
      document.removeEventListener('keydown', this.handleKeyDown);
      this.listening = false;
    }
  }

  /**
   * Checks if node is active element.
   */
  isActiveElement(node) {
    return node === document.activeElement;
  }

  /**
   * Handles up/down key navigation
   */
  handleKeyDown = (ev) => {
    const { children } = this.props;
    const currentIndex = this.additionalButtons.findIndex(this.isActiveElement);
    let nextIndex = -1;
    if (Events.isUpKey(ev)) {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : children.length - 1;
      ev.preventDefault();
    } if (Events.isDownKey(ev)) {
      nextIndex = currentIndex < children.length - 1 ? currentIndex + 1 : 0;
      ev.preventDefault();
    } else if (Events.isTabKey(ev)) {
      this.hideButtons();
    }

    if (nextIndex > -1) {
      this.additionalButtons[nextIndex].focus();
    }
  }

  /**
   * Returns props for the main button.
   */
  get mainButtonProps() {
    const { ...props } = validProps(this);
    props.onMouseEnter = this.hideButtons;
    props.onFocus = this.hideButtons;
    return props;
  }

  /**
   * Returns props for the toggle.
   */
  get toggleButtonProps() {
    const opts = {
      disabled: this.props.disabled,
      displayed: this.state.showAdditionalButtons,
      onClick: (ev) => { ev.preventDefault(); },
      onFocus: this.showButtons,
      buttonType: this.props.buttonType || this.props.as,
      size: this.props.size
    };

    if (!this.props.disabled) {
      opts.onMouseEnter = this.showButtons;
    }

    return opts;
  }

  /**
   * Returns the data tags for the component.
   */
  componentTags() {
    return {
      'data-component': 'split-button',
      'data-element': this.props['data-element'],
      'data-role': this.props['data-role']
    };
  }

  /**
   * Instantiates the additional button refs
   */
  addRef(ref, index) {
    if (!ref) return;
    this.additionalButtons[index] = ref;
  }

  /**
   * Returns the HTML for the main button.
   */
  get renderMainButton() {
    return (
      <div>
        <Button
          { ...this.mainButtonProps }
          data-element='main-button'
        >
          { this.props.text}
        </Button>

        <StyledSplitButtonToggle
          aria-haspopup='true'
          aria-expanded={ this.state.showAdditionalButtons }
          aria-controls={ this.buttonListId }
          { ...this.toggleButtonProps }
          data-element='open'
          onKeyPress={ this.handleToggleButtonKeyUp }
        >
          <Icon type='dropdown' />
        </StyledSplitButtonToggle>
      </div>
    );
  }

  handleToggleButtonKeyUp = (ev) => {
    if (Events.isEnterKey(ev) || Events.isSpaceKey) {
      this.additionalButtons[0].focus();
    }
  }

  /**
   * Passes in additional button props
   */
  childrenWithProps() {
    const { children } = this.props;
    const childArray = Array.isArray(children) ? children : [children];

    return childArray.map((child, index) => {
      const props = {
        key: index.toString(),
        ref: button => this.addRef(button, index),
        tabIndex: -1
      };
      return React.cloneElement(child, props);
    });
  }

  /**
   * Returns the HTML for the additional buttons.
   */
  get renderAdditionalButtons() {
    const children = this.childrenWithProps();

    if (!this.state.showAdditionalButtons) return null;

    return (
      <StyledSplitButtonChildrenContainer
        id={ this.buttonListId }
        data-element='additional-buttons'
      >
        { children }
      </StyledSplitButtonChildrenContainer>
    );
  }

  render() {
    return (
      <StyledSplitButton
        aria-haspopup='true'
        onMouseLeave={ this.hideButtons }
        { ...this.componentTags() }
      >
        { this.renderMainButton }
        { this.renderAdditionalButtons }
      </StyledSplitButton>
    );
  }
}

SplitButton.propTypes = {
  /** Button type: "primary" | "secondary" */
  buttonType: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** Button type: "primary" | "secondary" for legacy theme */
  as: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** The additional button to display. */
  children: PropTypes.node.isRequired,
  /** A custom value for the data-element attribute */
  'data-element': PropTypes.string,
  /** A custom value for the data-role attribute */
  'data-role': PropTypes.string,
  /** Gives the button a disabled state. */
  disabled: PropTypes.bool,
  /** The size of the buttons in the SplitButton. */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** The text to be displayed in the SplitButton. */
  text: PropTypes.string.isRequired
};

SplitButton.defaultProps = {
  as: 'secondary',
  disabled: false,
  size: 'medium'
};

SplitButton.safeProps = ['buttonType', 'as', 'disabled', 'size'];

export default SplitButton;
