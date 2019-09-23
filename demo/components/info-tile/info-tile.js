import css from 'utils/css';
import React from 'react';

// Carbon
import Pod from '../../../src/__deprecated__/components/pod';
import Portrait from 'components/portrait';
import './info-tile.scss';

class InfoTile extends React.Component {
  render() {
    return (
      <Pod
        as='tile'
        className={ `demo-info-tile ${ this.props.className }` }
      >
        <div className='demo-info-tile__content'>
          <Portrait
            className='demo-info-tile__image'
            gravatar={ this.props.gravatar }
            shape='circle'
            src={ this.props.src }
          />
          <div className={ `demo-info-tile__heading ${ css.textBold }` }>
            { this.props.title }
          </div>

          <br />

          <div className='demo-info-tile__description'>
            { this.props.description }
          </div>
        </div>
      </Pod>
    );
  }
}

export default InfoTile;
