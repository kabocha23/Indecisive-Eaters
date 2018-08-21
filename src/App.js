import React, { Component } from 'react';
import RestaurantSearchForm from './components/RestaurantSearchForm/RestaurantSearchForm';
import Header from './components/Header/Header';
import Options from './components/Options/Options';
import DecideButton from './components/Button/DecideButton';
import ResetButton from './components/Button/ResetButton';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      response: '',
      options: [],
      chosenOption: '',
      searchRequest: {},
    };

  }

  componentDidMount = () => {
    console.log(this.state)
  }
  
  componentDidUpdate = () => {
    if(this.state.chosenOption) this.showResult(this.state.chosenOption);
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
      console.log(res.data)
      this.setState({
        response: res.data
      });
    }).catch(err =>
      console.log("Could not fetch search results", err)
    );
  }

  onFormSubmit = (e) => {
    e.preventDefault();
  
    const option = e.target.elements.option.value;
  
    if(option) {
      this.setState({
        options: [...this.state.options, option]
      });
      e.target.elements.option.value = '';
    }
  };
  
  removeAll = () => {
    this.setState({
      options: [],
      chosenOption: '',
    });
  };
  
  onMakeDecision= () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    this.setState({
      chosenOption: this.state.options[randomNum],
    })
  };

  showResult = () => {
    alert(`Here's Your Restaurant: ${this.state.chosenOption}`)
  }

  updateInputValues = (e) => {
    let searchRequest = this.state.searchRequest;
    const { name, value } = e.target;
    searchRequest[name] = value;
    
    this.setState({
      searchRequest
    });
  }
  
  render() {
    const { searchRequest, response, options, chosenOption } = this.state;
    return (
      <div className="main-container">
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
          />
        {/* End of left-container */}
        </div>

        <div className='right-container'>
            {/* Drag search results to the options list */}
            <Options 
              options={ options }
              chosenOption={ chosenOption }
              onMakeDecision={ this.onMakeDecision }
            />
            {/* temporary form adding items to options array */}
            <form onSubmit={ this.onFormSubmit }>
              <input type="text" name="option"/>
              <button className='add-option-btn'>Add Option</button>         
            </form>
            {/* Randomly select one option */}
            <DecideButton 
              options={ options }
              onMakeDecision={ this.onMakeDecision }
            />
            {/* Remove all options */}
            <ResetButton 
              removeAll={ this.removeAll }
            />
        {/* End of right-container */}
        </div>
      </div>
    );
  }
}

export default App;
