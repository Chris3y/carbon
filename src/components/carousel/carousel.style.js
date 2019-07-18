import styled from 'styled-components';
import Icon from '../icon/icon';
import { slideAnimation, fadeAnimation } from './slide.config';

const CarouselNavigationStyle = styled.div`
  margin-top: -22.5px;
  position: absolute;
  top: 50%;
  z-index: 20;
`;

const CarouselPreviousButtonWrapperStyle = CarouselNavigationStyle;
const CarouselNextButtonWrapperStyle = styled(CarouselNavigationStyle)`
  right: 0;
`;

const CarouselButtonStyle = styled.button`
  border: none;
  width: 45px;
  height: 45px;
  background-color: #CCD6DA;

  &:hover {
    color: #255BC7;
    background-color: #99ADB6;
  }

  &:focus {
    outline: none;
  }
`;

const CarouselStyledIcon = styled(Icon)`
  cursor: pointer;
  display: inline-block;

  &&::before {
    font-size: 25px;
  }
`;

const CarouselStyledIconLeft = styled(CarouselStyledIcon)`
  transform: rotate(90deg);
`;

const CarouselStyledIconRight = styled(CarouselStyledIcon)`
  transform: rotate(-90deg);
`;

const CarouselSelectorInputStyle = styled.input`
  display: none;
`;

const CarouselSelectorLabelStyle = styled.label`
  border: 1px solid #4C6F7F;
  display: inline-block;
  height: 8px;
  margin: 0px 5px;
  width: 8px;

  &:hover {
    cursor: pointer;
  }
`;

const CarouselSelectorWrapperStyle = styled.div`
  height: 20px;
  margin-top: 5px;
  text-align: center;

    ${CarouselSelectorInputStyle}:checked {
    + ${CarouselSelectorLabelStyle} {
      background: #255BC7;
      border-color: transparent;
      height: 10px;
      position: relative;
      top: 1px;
      width: 10px;
    }
  }
`;

const CarouselSelectorInputWrapperStyle = styled.span`
  display: inline-block;
  line-height: 20px;
  vertical-align: middle;
  width: 22px;
`;

const CarouselWrapperStyle = styled.div`
  .carbon-carousel__content {
    overflow: hidden;
    position: relative;
}

  ${slideAnimation};
  ${fadeAnimation};
`;

export {
  CarouselNavigationStyle,
  CarouselNextButtonWrapperStyle,
  CarouselPreviousButtonWrapperStyle,
  CarouselButtonStyle,
  CarouselStyledIcon,
  CarouselStyledIconLeft,
  CarouselStyledIconRight,
  CarouselSelectorWrapperStyle,
  CarouselSelectorInputWrapperStyle,
  CarouselSelectorInputStyle,
  CarouselSelectorLabelStyle,
  CarouselWrapperStyle
};
