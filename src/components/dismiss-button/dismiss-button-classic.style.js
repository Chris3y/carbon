import { css } from 'styled-components';
import StyledIcon from '../icon/icon.style';
import { isClassic } from '../../utils/helpers/style-helper';

const colors = {
  error: '#c7384f',
  warning: '#ff7d00',
  success: '#50b848',
  info: '#1573e6',
  default: '#335c6d',
  help: '#ffab00',
  maintenance: '#ff7d00',
  new: '#639'
};

export default ({ theme, variant }) => isClassic(theme) && css`
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: 15px;
  justify-content: center;
  text-align: center;
  position: static;
  min-width: 15px;
  
  ${StyledIcon} {
    &:before {
      color: ${colors[variant]};
      font-size:16px;
    }
    &:hover:before{
      color: ${colors[variant]};
    }
  }

  ${({ transparent }) => transparent && css`
    background-color: transparent;
  `}
`;
