import React, { Component } from 'react';
import './Options.css';


class Options extends Component {

  render() {
    const { options } = this.props;
    return(
      <div className='options'>
        <p>
          { 
            options.length > 0 
            ? 'Here are your options'
            : 'Please add restaurants to the list'
          }
        </p>
        <ol>
          {
            options.map((option) => {
                return <li key={ option }>{ option }</li>
            })
          }
        </ol>
      </div>
    )
  }
}

export default Options;