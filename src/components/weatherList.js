import React from 'react'
import { connect } from 'react-redux'
import Canvas from './canvas'
import Grid from '@material-ui/core/Grid';
import { fetchReportId } from '../actions/weatherActions'

class WeatherList extends React.Component {
    state ={
        currTime : Date(0)
    }
render(){
    const{ reports, onGetReportbyId } = this.props;

   return (
       <div align="center" style={{marginTop : 30}}>
       <h3>{this.state.currTime}</h3>
    {
               reports.map((data, index) => {
                   return (
                    <Grid container spacing={24} key={index}>
                    {
                   
                               data.list.map((data, index) => {
                                   return <Canvas data={data} key={index} onGetReportbyId={onGetReportbyId}/>
                               }
                               )
                           }
                       </Grid>
                   )

               })
           }
          </div>
   )
}
}
const mapStateToProps = state => {
    return {
      reports: state.reports
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      onGetReportbyId: id => {
        dispatch(fetchReportId(id));
      }
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);