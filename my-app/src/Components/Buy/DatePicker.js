import DatePicker from "react-datepicker";                    //  Get react date picker                   
import "react-datepicker/dist/react-datepicker.css";          //  Get react date picker css
import React, {Component} from 'react';                       //  Get react
import Chart from './Chart';                                  //  Get chart component

class DatePick extends Component {
  state = {
    startDate: new Date(),                //  Get current date 
    endDate : new Date(),                 //  Get current date
    status: false,                        //  Flaq which represent visibility of chart
  };
  
  //  User change start date 
  handleChange = date => {
    this.setState({
      startDate: date,
      status: true
    });
  };

  //  User change end date
  handleEndDate = date => {
    this.setState({endDate:date,status:true});
  }

  //  Lead to format YY:MM:DD
  formatDate = (d) => {
    let month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  
  render() {
    let startdate = this.formatDate(this.state.startDate);            //  Get formatted starter date
    let enddate = this.formatDate(this.state.endDate);                //  Get formatted end date
    let symbol = this.props.symbol;                                   //  Get company symbol
    return (
      <>
        <div className="date-picker">
          <DatePicker id="datapicker1" className="picker"
            maxDate={this.state.endDate}
            selected={this.state.startDate}
            onChange={this.handleChange}
          />

          <DatePicker className="picker"
            minDate={this.state.startDate}
            maxDate={this.state.endDate}
            selected={this.state.endDate}
            onChange={this.handleEndDate}
          />
        </div>
        {this.state.status && <Chart startDate={startdate} endDate={enddate} symbol={symbol}/>}    
      </>
    );
  }
}

export default DatePick;