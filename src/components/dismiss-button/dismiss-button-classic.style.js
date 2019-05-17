import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import classicThemeColors from '../message/message-classic-theme-colors';

export default ({ theme, variant }) => theme.name === THEMES.classic && css`
  background-color: ${classicThemeColors[variant].backgroundColor};

  ${({ transparent }) => transparent && css`
    background-color: ${classicThemeColors.transparent.backgroundColor};
  `}
`;
