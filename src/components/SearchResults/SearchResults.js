import React, { Component } from 'react';
import Restaurant from '../Restaurant/Restaurant'
import HaventSearchedYet from '../HaventSearchedYet/HaventSearchedYet'
import './SearchResults.css'



class SearchResults extends Component {

  render() {
    const { restaurantList } = this.props;
    return(
      <div className='search-results-container'>     
        { restaurantList
          ? restaurantList.map(data => 
            <Restaurant 
              key={data.id}
              data={data}
            />
          )
          : <HaventSearchedYet />
        }
      </div>
    )
  }
}

export default SearchResults;