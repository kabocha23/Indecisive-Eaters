import React, { Component } from 'react';

import DecideButton from '../Buttons/DecideButton';
import ResetButton from '../Buttons/ResetButton';

import './OptionButtonBar.css';

class OptionButtonBar extends Component {

  render() {
    const { onMakeDecision, removeAll, options } = this.props;

    return(
      <div className='options-btn-container'>
        {/* Randomly select one option */}
        <DecideButton 
          options={ options }
          onMakeDecision={ onMakeDecision }
        />
        {/* Remove all options */}
        <ResetButton 
          removeAll={ removeAll }
        />
      </div>   
    )
  }
}

export default OptionButtonBar;