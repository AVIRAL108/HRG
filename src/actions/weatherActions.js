import {FETCH_WEATHER, FETCH_WEATHER_ID} from '../constants/constants'
import axios from 'axios';

const apiUrl = 'http://api.openweathermap.org/data/2.5/group?id=1277333,1275339,1275004,1283240,1176734,1253102,1270583,1269515,1274746,1263968&units=metric&appid=4c07b25604a7d41ebb7a5d77290c7cd6';

export const fetchReports = (reports) => {
return {
    type: FETCH_WEATHER,
    reports
  }
};

export const fetchAllReports = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}`)
      .then(response => {
        dispatch(fetchReports([response.data]))
      })
      .catch(error => {
        throw(error);
      });
  };
};
  export const fetchReportById = (reportsById) => {
    return {
      type: FETCH_WEATHER_ID,
      reportsById
    }
  }
  
  export const fetchReportId = id => {
    return (dispatch) => {
      return axios.get('http://api.openweathermap.org/data/2.5/forecast?id='+id+'&appid=4c07b25604a7d41ebb7a5d77290c7cd6')
        .then(response => {
          dispatch(fetchReportById([response.data]))
        })
        .catch(error => {
          throw(error);
        });
    };
  };