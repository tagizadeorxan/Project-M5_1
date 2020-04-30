import React, { Component } from 'react';
import './eachstock.css';

let data = {
    symbol: "AVGO",
    name: "Broadcom Limited",
    price: 276.02,
}


class EachStock extends Component {


    render() {
        // let {data} = this.props; 
        let splitstring = String(data.price).split('.')

        return (
            <div className="eachStock-row">
                <div className="eachStock-row-symbol">{data.symbol}</div>
                <div className="eachStock-row-name">{data.name}</div>
                <div className="eachStock-row-price">{splitstring[0]}.</div>
                <div className="eachStock-row-price-decimal">{splitstring[1]} $</div>
            </div>


        )
    }
}

export default EachStock;