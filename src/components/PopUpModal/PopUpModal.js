import React from "react";
import Popup from "reactjs-popup";

import './PopUpModal.css'


class PopUpModal extends React.Component {

  formatPhoneNumber = (phoneNumber) => {
    let refined = phoneNumber.substr(2);
    let format = refined.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!format) ? null : "(" + format[1] + ") " + format[2] + "-" + format[3];
  };

  roundRating = (rating) => {
    return (Math.round(rating * 2) / 2).toFixed(1);
  }

  render() {
    const { chosenOption, closeModal, open } = this.props;
    const handleCloseModal = closeModal;
    { if(chosenOption) {
      const { name, url, review_count, price, image_url, rating, phone } = this.props.chosenOption;
      const { address1, city, state, zip_code } = this.props.chosenOption.location;
      const formattedPhoneNumber = this.formatPhoneNumber(phone);
      const roundedRating = this.roundRating(rating);

      return (
        <div className='chosen-option-modal'>
          <Popup
            open={ open }
            closeOnDocumentClick
            onClose={ closeModal }
          >
            <div className='popup-container'>
              <div className='popup-header'>
                <h2>THE COMPUTER HAS SPOKEN</h2>
                <h4>You will go to:</h4>
              </div>
              <div className='popup-text'>
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
                  <span className='address'>{ formattedPhoneNumber }</span>
                </p>
                <p>
                  <img src={require(`../../static/img/yelp-stars/${ roundedRating }.png`)} alt='star-ratings-img'/> { review_count } Reviews
                </p>
                <p>
                  <span className='star-rating'>{ price }</span>
                </p>
                <img src={require(`../../static/img/yelp-tm.png`)} alt='yelp-logo-img' className='yelp-logo'/>
              </div>
              <div className='popup-image'>
                <img src={ image_url } alt='restaurant-img'/>
              </div>
            </div>
            <div className='close-modal-container'>
              <button
                className="close-modal-btn"
                onClick={ handleCloseModal }
              >
                Close
              </button>
            </div>
          </Popup>
        </div>
      );
    } else { 
      return (
        <div className='nothing-to-see'>
        </div>
      )
    }
}
  }
}

export default PopUpModal;
