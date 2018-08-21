import React, { Component } from 'react';
import './Header.css';


class Header extends Component {

  render() {
    return(
      <div className='header-box'>
        <h1>Indecisive Eaters</h1>
        <h4>Let the computer decide your life</h4> 
      </div>
    )
  }
}

export default Header;