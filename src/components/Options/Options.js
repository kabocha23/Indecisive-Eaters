import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import Restaurant from '../Restaurant/Restaurant'
// import flow from 'lodash/flow';

import './Options.css';


const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    restaurant: monitor.getItem(),
  }
}

const optionsTarget = {
  // in case more methods need to be used
};

class Options extends Component {

  render() {
    const { options, connectDropTarget, hovered, handleDrop, deleteOption, isOption, formatPhoneNumber } = this.props;
    const backgroundColor = hovered ? 'rgb(240, 248, 255, 0.4)' : 'transparent';
    return connectDropTarget(
      <div className='options' style={{ background: backgroundColor }}>
        <p className={options.length < 1 ? 'no-options' : 'multiple-options'}>
          { 
            options.length < 2 
            ? 'Drag two or more desired restaurants here'
            : 'Press the Decide button and get ready to go!'
          }
        </p>
        { options
          ? options.map(choice => 
            <Restaurant 
              key={choice.id}
              data={choice}
              handleDrop={(id) => handleDrop(id)}
              deleteOption={(id) => deleteOption(id)}
              isOption={isOption}
              formatPhoneNumber={(phoneNumber) => formatPhoneNumber(phoneNumber)}
            />
          )
          : null
        }
      </div>
    )
  }
}

export default DropTarget('restaurant', optionsTarget, collect)(Options);