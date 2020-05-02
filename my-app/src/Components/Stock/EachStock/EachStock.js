import React, { Component } from 'react';
import './eachstock.css';
import { Link } from 'react-router-dom';



class EachStock extends Component {

    state = { id: 0 };

    render() {

        let { data } = this.props;
        let splitstring = String(data.price.toFixed(2)).split('.')
       
        return (
        
            <Link className="linked" to={`/stock/${data.symbol}`}>

                <div className="eachStock-row">
                    <div className="eachStock-row-symbol"> <div >{data.symbol}</div></div>
                    <div className="eachStock-row-name"><div>{data.name}</div></div>
                    <div className="eachStock-row-price">{splitstring[0]}.</div>
                    <div className="eachStock-row-price-decimal">{splitstring[1]} $</div>
                </div>
            </Link>
        )
    }
}

export default EachStock;