import { combineReducers } from "redux";
import  weatherReducer from "./weatherReducer";
import weatherByIdReducer from "./WeatherById";
export default combineReducers({
  reports:  weatherReducer,
  reportsById : weatherByIdReducer
}); 