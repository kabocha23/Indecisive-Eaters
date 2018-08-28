import React, { Component } from 'react';
import './RestaurantSearchForm.css'



class RestaurantSearchForm extends Component {

  handleSearchClick = (e) => {
    e.preventDefault();
    this.props.onRestSearchClick()
  }

  handleInputValues(e) {
    e.preventDefault();
    this.props.updateInputValues(e)
  }


  render() {
    const { term, location } = this.props;
    return(
      <div className='search-container'>
        <form 
          className='search-form' 
          onChange={e => this.handleInputValues(e)} 
          onSubmit={ this.handleSearchClick }
        >
          <input 
            type="text" 
            name="term" 
            className="restaurantType"
            placeholder="Deep dish pizza, bun bo hue, yakitori..."
            value={ term }
          />
          <input 
            type="text" 
            name="location"
            className="restaurantLocation"
            placeholder="address, neighborhood, city, state, zip"
            value={ location }
          />
          <button 
            className='search-btn'
            disabled={ !term || !location }
          >
            <img src={require('../../static/img/search-icon.png')} alt='search-icon'/>
          </button>         
        </form>
      </div>
    )
  }
}

export default RestaurantSearchForm;