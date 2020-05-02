
import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './Buy';






// let edited = {};



class Chart extends Component {

    // state = { res: [],startDate: new Date(),endDate: new Date(), symbol:'' };
    state={
        data:[]
    }

    componentDidUpdate(){
        this.getData();
    }
    
 
    getData = () => {
        fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.symbol}?from=${this.props.startDate}&to=${this.props.endDate}`)
            .then(res => res.json())
            .then(res =>this.setState({data:res.historical}));
           
    }


    render() {
        console.log(this.props.startDate);
        console.log(this.props.endDate);
        console.log(this.props.symbol);
        console.log(this.state.data)

        return (
             
            <div className="chart">
                <LineChart width={600} height={300} data={this.state.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="label"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="vwap" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart></div>
        )
    }
}

export default Chart;