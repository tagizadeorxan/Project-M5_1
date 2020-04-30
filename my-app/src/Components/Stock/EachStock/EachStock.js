import React, { Component } from 'react';
import './eachstock.css';
import { Link } from 'react-router-dom';



class EachStock extends Component {

    state = { id: 0 };

    render() {

        let { data } = this.props;
        let splitstring = String(data.price).split('.')
        // console.log(data);
        return (
<<<<<<< HEAD

            <Link className="linked" to={`/stock/${data.symbol}`}>
=======
            <Link className="link" to={`/stock/${data.symbol}`}>
>>>>>>> e949fe83eac016c56fca41efd78900ea7c1e8571

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