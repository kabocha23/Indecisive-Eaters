import React, { Component } from 'react';
import './DecideButton.css';


class DecideButton extends Component {

  render() {
    const { options, onMakeDecision } = this.props;
    return(
      <div className='decide-btn-cont'>
        <button 
          className='decide-btn'
          disabled={ options.length === 0 }
          onClick={ onMakeDecision }
        >
          Decide for me!
        </button>
      </div>
    )
  }
}

export default DecideButton;