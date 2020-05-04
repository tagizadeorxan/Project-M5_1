import React, {Component} from 'react';
import './EachAccountData.css';
import ShowDiffer from '../ShowDiffer/ShowDiffer';
import '../../../animations.css';

class EachAccountData extends Component {

    //  Receive a company name
    getFullName = () => {
        const {actualData, data} = this.props;
        const foundedActual = actualData.find(item => item.symbol === data.code );
        return foundedActual.profile.companyName
    }

    //  Receive number of purchased stocks
    getCountOfBoughtStocks = () => {
        const {data} = this.props;
        const countOfBoughtStocks = Math.round(data.purchasePrice / data.amount);
        return countOfBoughtStocks
    }

    //  Getting changes in currency and percentage
    getFirstAndSecond = () => {
        const {actualData, data} = this.props;
        const foundedActual = actualData.find(item => item.symbol === data.code );
        const difference = foundedActual.profile.price -data.amount;       
        const globalPercentDifference = ((difference * 100)/data.amount);
        return {
            first:  difference.toFixed(2),
            second: globalPercentDifference.toFixed(2)
        }
    }

    render() {
        const {data, actualData} = this.props;
        const splitString = String(data.purchasePrice.toFixed(2)).split('.');
        return (
            (data && actualData) ?
            <div className="EachAccountData" >
                <div className="EachAccountData-Company-Code">{data.code}</div>
                <div className="EachAccountData-Company-Fullname">{this.getFullName()}</div>  
                <div className="EachAccountData-stock-quantity">{this.getCountOfBoughtStocks()}<span> pcs</span></div>
                <div className="EachAccountData-price-variable">
                    <div>
                        <span className="EachAccountData-price-integer">{splitString[0]}</span> 
                        .
                        <span className="EachAccountData-price-decimal">{splitString[1]}</span>         
                    </div>      
                </div>
                <div className="EachAccountData-price-difference">
                    <ShowDiffer data={this.getFirstAndSecond()} />
                </div>
            </div>
            : null
        )
    }
}

export default EachAccountData;