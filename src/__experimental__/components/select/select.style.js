import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import StyledPill from '../../../components/pill/pill.style';
import StyledInput from '../input/input.style';
import StyledIcon from '../../../components/icon/icon.style';
import { isClassic } from '../../../utils/helpers/style-helper';

const StyledSelect = styled.div`
  ${({ isAnyValueSelected }) => isAnyValueSelected && css`
    ${StyledInput}::placeholder {
      visibility: hidden;
    }
  `}

  ${({ theme }) => isClassic(theme) && css`
    &:hover {
      ${StyledIcon} {
        color: ${theme.colors.white};
      }
    }
  `}
`;

const StyledSelectPillContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3px 2px 3px 0;

  && ${StyledPill} {
    text-overflow: ellipsis;
  }
`;

StyledSelectPillContainer.propTypes = {
  theme: PropTypes.object
};

StyledSelectPillContainer.defaultProps = {
  theme: baseTheme
};

export { StyledSelect, StyledSelectPillContainer };
