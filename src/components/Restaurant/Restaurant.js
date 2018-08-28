import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import './Restaurant.css'

const restaurantSource = {
  beginDrag(props) {
    return {
      restaurantId: props.data.id
    }
  },
  endDrag(props, monitor, component) {
    if(!monitor.didDrop()) {
      return;
    }
    console.log('endDrag', props.data.id, monitor.getDropResult())
    return props.handleDrop(props.data.id)
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Restaurant extends Component {

  formatPhoneNumber = (phoneNumber) => {
    let refined = phoneNumber.substr(2);
    let format = refined.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!format) ? null : "(" + format[1] + ") " + format[2] + "-" + format[3];
  };

  render() {
    const { isDragging, connectDragSource, isOption, deleteOption } = this.props;
    const opacity = isDragging ? 0 : 1;
    const { name, url, review_count, price, image_url, rating, id, phone } = this.props.data;
    const { address1, city, state, zip_code } = this.props.data.location;
    const formattedPhoneNum = this.formatPhoneNumber(phone)

    return connectDragSource(
      <div className='listing-container' style={{ opacity }}>
        <div className='text-info'>
          <a href={ url }>
            <h3>{ name }</h3>
          </a>
          <p>
            <span className='address'>{ address1 }</span>
          </p>
          <p>
            <span className='address'>{ city }, { state } { zip_code }</span>
          </p>
          <p>
            <span className='address'>{ formattedPhoneNum }</span>
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
        <div className='delete-btn'>
        { isOption[id] === 1 &&
          <span 
            className='deletebtn' 
            onClick={() => deleteOption(id) }
          >
            &times;
          </span>
        }
        </div>
      </div>
    )
  }
}

// Restaurant.propTypes = {
//   connectDragSource: PropTypes.func.isRequired,
//   isDragging: PropTypes.bool.isRequired
// };

export default DragSource('restaurant', restaurantSource, collect)(Restaurant);

