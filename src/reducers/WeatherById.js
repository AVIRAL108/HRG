import {FETCH_WEATHER_ID } from '../constants/constants'

export default function weatherByIdReducer(state = [], action) {
  switch (action.type) {
      case FETCH_WEATHER_ID:
      return action.reportsById;
    default:
      return state;
  }
}