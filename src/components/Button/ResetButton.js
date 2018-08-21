import React, { Component } from 'react';
// import './ResetButton.css';


class ResetButton extends Component {

  render() {
    const { removeAll } = this.props;
    return(
      <div className='reset-btn-cont'>
        <button
          className='reset-btn' 
          onClick={ removeAll }
        >
          Reset
        </button>
      </div>
    )
  }
}

export default ResetButton;