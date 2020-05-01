import React, {Component} from 'react';
import './EachAccountData.css';
import ShowDiffer from '../ShowDiffer/ShowDiffer';

class EachAccountData extends Component {

    getFullName = () => {
        const {actualData, data} = this.props;
        const foundedActual = actualData.find(item => item.symbol === data.code );
        return foundedActual.companyName
    }

    getCountOfBoughtStocks = () => {
        const {data} = this.props;
        const countOfBoughtStocks = Math.round(data.purchasePrice / data.amount);
        return countOfBoughtStocks
    }

    getFirstAndSecond = () => {
        const {actualData, data} = this.props;
        const foundedActual = actualData.find(item => item.symbol === data.code );
        const difference = data.purchasePrice - foundedActual.profile.price;
        const globalPercentDifference = ((difference * 100)/data.purchasePrice);
        if(!difference || !globalPercentDifference) {
            return;
        }
        return {
            first:  difference.toFixed(2),
            second: globalPercentDifference.toFixed(2)
        }
    }

    render() {
        const {data, actualData} = this.props;
        return (
            (data && actualData) ?
            <div className="EachAccountData">
                <div>{data.code}</div>
                <div>{this.getFullName()}</div>  
                <div>{this.getCountOfBoughtStocks()}<span> pcs</span></div>
                <div>{data.purchasePrice}</div>
                <ShowDiffer data={this.getFirstAndSecond()} />
            </div>
            : null
        )
    }
}

export default EachAccountData;