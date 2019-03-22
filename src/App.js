import React, { Component } from 'react';
import WeatherList from './components/weatherList'
import { Provider } from "react-redux";
import store from "./store";
import { fetchAllReports } from './actions/weatherActions';
import ButtonAppBar from './components/Navbar';

store.dispatch(fetchAllReports());

class App extends Component {

  render() {

    return (
      <Provider store={store}>

      <div className="App">
       
      <ButtonAppBar></ButtonAppBar>
      <WeatherList></WeatherList>
  
      </div>
      </Provider>
    );
  }
}

export default App;
