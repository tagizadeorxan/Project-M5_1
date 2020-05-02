import React, { Component } from 'react';
import './Buy.css';
import DatePicker from './DatePicker';

class Buy extends Component {

    state = { data: { symbol: '', profile: { price: '', companyName: '' } }, value: 1, price: 0 };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getData();
    }

    //function when - button pressing increse quantity of stock
    handleMinus = () => {
        let { data } = this.state;
        let result = this.state.value > 1 ? this.setState({ value: this.state.value - 1 }, () => this.changePrice()) : null;
    }

    //function when + button pressing increse quantity of stock

    handlePlus = () => {
        let { data } = this.state;
        this.setState({ value: this.state.value + 1 }, () => this.changePrice());
    }


    changePrice = () => {
        let { data } = this.state;
        let price = this.state.value * data.profile.price;
        this.setState({ price });
    }


    //buy stock with given quantity and sending it to server api and cheking if response of buy will true will change balance

    handleBuy = () => {
        let { data } = this.state;
        let price = this.state.value * data.profile.price;
        this.setState({ price }, () => { if(this.writeServer()){
            const response = fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4')
            .then(data => data.json()).then(result => {
                price = result.currentBalance - price;
                this.updateBalance(price);
                alert("you bought successfully, check your account");
                this.props.history.goBack();
            }).catch(err => alert("something wrong please try again later"))
        }
       
        });
     
    }


    // after success buy action updating balance of user in api

    updateBalance = (price) => {
        let options = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                currentBalance: price
            })
        }

        fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/4", options)
            .then(data => data.json()).catch(err => alert("something wrong please try again later"));
    }

    //writing data to server pruchase history and catching error while data is cant be buy


    writeServer = () => {
        let { data } = this.state;
        let result = false;
        let options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                amount: data.profile.price,
                code: data.symbol,
                purchasePrice: this.state.price,
            })
        }
        fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks", options).then(res => res.ok ? result=true:alert("something wrong please try again later")).catch((err) => console.log(err));
        return result;
    }

    //getting each stock data in the page to buy

    getData = () => {
        let id = this.props.match.params.id;
        fetch(`https://financialmodelingprep.com/api/v3/company/profile/${id}`).then(data => data.json()).then(data => {
        let price = data.profile.price;
        this.setState({ data, price })
        }).catch(err=>alert("something wrong please try again later"));
    }

    render() {
        let { data } = this.state;
        let numberOne = Number(data.profile.price).toFixed(2);
        let numberTwo = Number(this.state.price).toFixed(2);
        let splitstring = String(numberOne).split('.');
        let splitstring2 = String(numberTwo).split('.');

        return (
            <div className="main">

                <div className="container">
                    <div><i className="glyphicon glyphicon-menu-left"></i><button onClick={() => this.props.history.goBack()}>Back</button></div>
                    <div><p>{data.profile.companyName}</p></div>
                </div>
                <div className="buy-defaut-price"><p>{splitstring[0]}.</p><span>{splitstring[1]}$</span></div>
                <div className="buy-quantity">
                    <button onClick={this.handleMinus}>-</button>
                    <span>{this.state.value}</span>
                    <button onClick={this.handlePlus}>+</button>
                </div>
                <div className="buy-price">
                    <span>Buy for </span>
                    <span> {splitstring2[0]}.</span>
                    <span>{splitstring2[1]}$</span>
                </div>
                <div className="buy-button" > <button onClick={this.handleBuy}>Buy</button></div>
                <DatePicker symbol={this.state.data.symbol} />
            </div>
        )
    }
}

export default Buy;