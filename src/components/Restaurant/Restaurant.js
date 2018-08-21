import React, { Component } from 'react';
import './Restaurant.css'



class Restaurant extends Component {

  formatPhoneNumber = (phoneNumber) => {
    let refined = phoneNumber.substr(2);
    let format = refined.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!format) ? null : "(" + format[1] + ") " + format[2] + "-" + format[3];
  }

  render() {
    const{ name, url, review_count, price, image_url, rating } = this.props.data;
    const{ address1, city, state, zip_code } = this.props.data.location;
    const formattedPhoneNumber = this.formatPhoneNumber(this.props.data.phone);
    return(
      <div className='listing-container'>
        <div className='text-info'>
          <a href={ url }>
            <h3>{ name }</h3>
          </a>
          <p>
            <span className='address'>
              { address1 }
            </span>
          </p>
          <p>
            <span className='address'>{ city }, { state } { zip_code }</span>
          </p>
          <p>
            <span className='address'>{ formattedPhoneNumber }</span>
          </p>
          <p>
            <img src={require(`../../static/img/yelp-stars/${rating}.png`)} alt='star-ratings-img'/> { review_count } Reviews
          </p>
          <p>
            <span className='star-rating'>{ price }</span>
          </p>
          <img src={require(`../../static/img/yelp-tm.png`)} alt='yelp-logo-img' className='yelp-logo'/>
        </div>
        <div className='restaurant-image'>
          <img src={ image_url } alt='restaurant-img'/>
        </div>
      </div>
    )
  }
}

export default Restaurant;

