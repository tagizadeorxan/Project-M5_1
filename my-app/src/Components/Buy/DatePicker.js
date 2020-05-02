import DatePicker from "react-datepicker";
import './Buy';
import "react-datepicker/dist/react-datepicker.css";
import React, {Component} from 'react';
import Chart from './Chart';

class DatePick extends Component {
  state = {
    startDate: new Date(),
    endDate : new Date(),
    status: false,
  };
      
  handleChange = date => {
    console.log(date);
    this.setState({
      startDate: date,
      status :true
    });
  };

  handleEndDate = date => {
    console.log(date);
    this.setState({endDate:date,status:true});
  }


  formatDate = (d) => {
    let month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  
  render() {
    let startdate = this.formatDate(this.state.startDate);
    let enddate = this.formatDate(this.state.endDate);
    let symbol = this.props.symbol;
    console.log(startdate, enddate);
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