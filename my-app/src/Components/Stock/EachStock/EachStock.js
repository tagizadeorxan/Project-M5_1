import React, { Component } from 'react';
import './eachstock.css';




class EachStock extends Component {


    render() {
        let {data} = this.props; 
        let splitstring = String(data.price).split('.')

        return (
            <div className="eachStock-row">
            <div className="eachStock-row-symbol"> <div >{data.symbol}</div></div>
                <div className="eachStock-row-name"><div>{data.name}</div></div>
                <div className="eachStock-row-price">{splitstring[0]}.</div>
                <div className="eachStock-row-price-decimal">{splitstring[1]} $</div>
            </div>


        )
    }
}

export default EachStock;