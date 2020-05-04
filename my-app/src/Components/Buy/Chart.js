
import React, { Component } from 'react';                                   //  Get react
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts';            //  Get required objs for chart                                                             

class Chart extends Component {
    state={
        data:[],                    //  Contains data in selected period
        isChange: false             //  Сrutch for prevent render 
    }

    componentDidMount(){
        this.getData();
    }

    //  Start getting data when period is changed
    componentWillReceiveProps(){
        this.setState({isChange: !this.state.isChange}, ()=> { this.getData(); });
    }
 
    //  Get data in selected period 
    getData = () => {
        fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.symbol}?from=${this.props.startDate}&to=${this.props.endDate}`)
        .then(res => res.json())
        .then(res =>this.setState({data:res.historical}), ()=> {
            this.render();
        });
    }

    render() {
        return (
            <div className="chart">                
                <AreaChart width={600} height={300} data={this.state.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="vwap" stroke="#833ae0" fill="#B073FF" />
                </AreaChart>
            </div>
        )
    }
}

export default Chart;