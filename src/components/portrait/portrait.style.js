import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import getSizeParams from './portrait-size.config';
import BaseTheme from '../../style/themes/base';
import Icon from '../icon';
import OptionsHelper from '../../utils/helpers/options-helper';
import { isClassic } from '../../utils/helpers/style-helper';

function stylingForSize({ size, theme }) {
  const params = getSizeParams(theme, size);

  if (!params) {
    return css``;
  }

  return css`
    width:  ${params.dimensions}px;
    height: ${params.dimensions}px;
  `;
}

function stylingForShape({ shape }) {
  switch (shape) {
    case 'standard': return css`border-radius: 0px;`;
    case 'circle': return css`border-radius: 50%;`;
    case 'leaf': return css`border-radius: 10% 40% 10%;`;
    default: return css``;
  }
}

function stylingForIcon({ size, theme, darkBackground }) {
  const isThemeClassic = isClassic(theme);
  const params = getSizeParams(theme, size);

  if (!params) {
    return css``;
  }

  let color = theme.portrait.border;
  let backgroundColor = theme.portrait.background;
  let iconPadding = ((params.dimensions - params.iconDimensions) / 2) - 1;

  if (darkBackground) {
    color = theme.portrait.background;
    backgroundColor = theme.portrait.border;
  }

  if (isThemeClassic) {
    color = (darkBackground ? '#ffffff' : '#335c6d');
    backgroundColor = (darkBackground ? '#668592' : '#ccd6db');
    iconPadding = params.iconPadding;
  }

  return css`
    padding: ${iconPadding}px;
    background-color: ${backgroundColor};
    color: ${color};

    ${params.iconDimensions && css`
      svg {
        width:  ${params.iconDimensions}px;
        height: ${params.iconDimensions}px;
      }
    `}

    ${isThemeClassic && css`
      border: 1px solid #8099a4;
    `}
  `;
}

export function getColorsForInitials(theme, darkBackground) {
  if (isClassic(theme)) {
    return {
      textColor: (darkBackground ? '#FFFFFF' : '#636872'),
      bgColor: (darkBackground ? '#8A8E95' : '#D8D9DC')
    };
  }

  return {
    textColor: (darkBackground ? theme.portrait.background : theme.portrait.initials),
    bgColor: (darkBackground ? theme.portrait.initials : theme.portrait.background)
  };
}


export const StyledPortraitInitials = styled.img`
  position: absolute;
  ${({ theme }) => !isClassic(theme) && css`border: 1px solid ${theme.portrait.border};`}
`;

StyledPortraitInitials.propTypes = {
  theme: PropTypes.object,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

StyledPortraitInitials.defaultProps = {
  theme: BaseTheme
};

export const StyledPortraitGravatar = styled.img`
  display: inline-block;
  position: absolute;
  ${stylingForSize}
`;

StyledPortraitGravatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};


export const StyledCustomImg = styled.img`
  display: inline-block;
  position: absolute;
  ${stylingForSize}
`;

StyledCustomImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesFull).isRequired
};


// && is used here to increase the specificity
export const StyledIcon = styled(
  ({ darkBackground, ...rest }) => <Icon { ...rest } />
)`
  && {
    position: absolute;
    box-sizing: border-box;
    line-height: 14px;
    ${stylingForSize}
    ${stylingForIcon}
    ${stylingForShape}
    ${({ theme }) => !isClassic(theme) && css`border: 1px dashed ${theme.portrait.border};`}
  }
`;

StyledIcon.propTypes = {
  darkBackground: PropTypes.bool,
  size: PropTypes.oneOf(OptionsHelper.sizesFull),
  theme: PropTypes.object,
  type: PropTypes.string.isRequired
};

StyledIcon.defaultProps = {
  darkBackground: false,
  size: 'medium',
  theme: BaseTheme
};


const StyledPortrait = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  ${stylingForSize}
  ${stylingForShape}
`;

StyledPortrait.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesFull),
  shape: PropTypes.oneOf(OptionsHelper.shapesVaried),
  darkBackground: PropTypes.bool,
  theme: PropTypes.object
};

StyledPortrait.defaultProps = {
  size: 'medium',
  shape: 'standard',
  darkBackground: false,
  theme: BaseTheme
};

export default StyledPortrait;
