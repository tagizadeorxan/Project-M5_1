
import React, { Component } from 'react';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import './Buy';






let edited = {};



class Chart extends Component {

    state = { res: [],startDate: new Date(),endDate: new Date(), symbol:'' };
    
 
    getData = () => {
        fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.symbol}?from=${this.props.startDate}&to=${this.props.endDate}`)
            .then(res => res.json()).then(res => {
                edited= res;
                console.log(edited);
            });
           
    }


    render() {
        console.log(this.props.startDate);
        console.log(this.props.endDate);
        console.log(this.props.symbol);
        this.getData();

        return (
             
            <div className="chart">
                <LineChart
                    width={400}
                    height={400}
                    data={[
                        {
                            "name": "edited.symbol",
                            "uv": "edited.number",
                            "pv": 2400,
                            "amt": 2400
                        }]


                    }
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
                </LineChart></div>
        )
    }
}

export default Chart;