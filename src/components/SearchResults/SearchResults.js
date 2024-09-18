import React, { Component } from 'react';

import Restaurant from '../Restaurant/Restaurant'
import HaventSearchedYet from '../HaventSearchedYet/HaventSearchedYet'

import './SearchResults.css'



class SearchResults extends Component {

  render() {
    const { restaurantList, handleDrop, deleteOption, isOption, formatPhoneNumber } = this.props;
    console.log(typeof restaurantList)
    return(
      <div className='search-results-container'>     
        { restaurantList
          ? restaurantList.map(data => 
            <Restaurant 
              key={data.id}
              data={data}
              isOption={ isOption }
              handleDrop={(id) => handleDrop(id)}
              deleteOption={(id) => deleteOption(id)}
              formatPhoneNumber={(phoneNumber) => formatPhoneNumber(phoneNumber)}
            />
          )
          : <HaventSearchedYet />
        }
      </div>
    )
  }
}

export default SearchResults;