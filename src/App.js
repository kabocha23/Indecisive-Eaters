import React, { Component } from 'react';
import axios from 'axios';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import RestaurantSearchForm from './components/RestaurantSearchForm/RestaurantSearchForm';
import Header from './components/Header/Header';
import Options from './components/Options/Options';
import OptionButtonBar from './components/OptionButtonBar/OptionButtonBar';
import SearchResults from './components/SearchResults/SearchResults';
import PopUpModal from './components/PopUpModal/PopUpModal';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      response: undefined,
      options: [],
      chosenOption: undefined,
      isOption: {},
      searchRequest: {
        term: '',
        location: '',
        limit: '',
      },
      open: false,
    };

  }

  

  onRestSearchClick = async () => {
    let termState = this.state.searchRequest["term"]
    let locationState = this.state.searchRequest["location"]
    // Calling yelp-fusion API through server - CORS error while calling directly from front-end
    axios.get('/api/restaurantsearch', {
      params: {
        term: termState,
        location: locationState,
        limit: 10,
      }
    })
    .then(res => {
      this.setState({
        response: res.data
      });
    }).catch(err =>
      console.log("Could not fetch search results", err)
    );
  };

  updateInputValues = (e) => {
    let searchRequest = this.state.searchRequest;
    const { name, value } = e.target;
    searchRequest[name] = value;
    
    this.setState({
      searchRequest
    });
  }

  moveRestaurant = (id) => {
    const { response, options, isOption } = this.state;
    let tempOptions = options;

    for(let i = 0; i < response.length; i++) {
      if(response[i].id === id && !isOption[id]) {
        tempOptions.push(response[i]);
        isOption[id] = 1;
      } else if((response[i].id === id) && (isOption[id] !== 1)) {
        tempOptions.push(response[i]);
        isOption[id] = 1;
      }
    }
    this.setState({
      options: tempOptions
    })
  }

  deleteOption = (id) => {
    const { options, isOption } = this.state;
    let tempOptions = options;

    for(let j = 0; j < options.length; j++) {
      if(options[j].id === id) {
        tempOptions.splice(j, 1);
        isOption[id] = 0;
      }
    }
    this.setState({
      options: tempOptions
    })
  }

  removeAll = () => {
    this.setState({
      options: [],
      chosenOption: '',
      isOption: {},
    });
  };
  
  onMakeDecision= () => {
    const { options } = this.state;
    const randomNum = Math.floor(Math.random() * options.length);
    
    this.setState({
      chosenOption: options[randomNum],
      open: true,
    })
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { searchRequest, response, options, chosenOption, isOption, open } = this.state;
    return (
      <div className="main-container">
        <PopUpModal 
          chosenOption={ chosenOption }
          open={ open }
          closeModal={ this.closeModal }
          formatPhoneNumber={(phoneNumber) => this.formatPhoneNumber}
        />
        {/* Header and search bar spans across top */}
        <Header />
        <RestaurantSearchForm 
          onRestSearchClick={ this.onRestSearchClick }
          term={ searchRequest["term"] }
          location={ searchRequest["location"] }
          updateInputValues={ this.updateInputValues }
        />
        {/* Left and Right containers sit below Header */}
        <div className="left-container">
          <SearchResults 
            onRestSearchClick={ this.onRestSearchClick }
            restaurantList={ response }
            isOption={ isOption }
            handleDrop={(id) => this.moveRestaurant(id)}
            deleteOption={(id) => this.deleteOption(id)}
            formatPhoneNumber={(phoneNumber) => this.formatPhoneNumber}
          />
        {/* End of left-container */}
        </div>

        <div className='right-container'>
          {/* Buttons that make a decision and remove all options */}
          { options.length > 1 &&
            <OptionButtonBar 
              options={ options }
              onMakeDecision={ this.onMakeDecision }
              removeAll={ this.removeAll }
              formatPhoneNumber={(phoneNumber) => this.formatPhoneNumber(phoneNumber)}
            />
          }
          {/* Drag search results to the options component */}
          <Options 
            options={ options }
            chosenOption={ chosenOption }
            isOption={ isOption }
            handleDrop={(id) => this.moveRestaurant(id)}
            deleteOption={(id) => this.deleteOption(id)}
            formatPhoneNumber={(phoneNumber) => this.formatPhoneNumber(phoneNumber)}
          />
        {/* End of right-container */}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
