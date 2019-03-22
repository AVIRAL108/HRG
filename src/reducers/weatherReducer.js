import {  FETCH_WEATHER } from '../constants/constants'

export default function weatherReducer(state = [], action) {
  switch (action.type) {
      case FETCH_WEATHER:
      return action.reports;
    default:
      return state;
  }
}