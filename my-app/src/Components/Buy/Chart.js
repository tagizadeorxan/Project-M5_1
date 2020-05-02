
import React, { Component } from 'react';
import {LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './Buy';


class Chart extends Component {

    
    // state = { res: [],startDate: new Date(),endDate: new Date(), symbol:'' };
    state={
        data:[]
    }

    componentDidMount(){
        this.getData();
    }
    
 
    getData = () => {
        fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.symbol}?from=${this.props.startDate}&to=${this.props.endDate}`)
            .then(res => res.json())
            .then(res =>this.setState({data:res.historical}));
           
    }


    render() {
        // console.log(this.props.startDate);
        // console.log(this.props.endDate);
        // console.log(this.props.symbol);
        // console.log(this.state.data)
        console.log(this.props.symbol);
        return (
             
            
                <div className="chart">                
                    {/* { */}
                        {/* this.state.data !== undefined ? */}
                        <AreaChart width={600} height={300} data={this.state.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="vwap" stroke="#833ae0" fill="#B073FF" />
                        </AreaChart>
                        {/* : null */}
                    {/* } */}
                </div>
        )
    }
}

export default Chart;