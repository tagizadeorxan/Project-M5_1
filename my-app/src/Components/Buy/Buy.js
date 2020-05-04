import React, { Component } from 'react';
import './Buy.css';
import DatePicker from './DatePicker';

class Buy extends Component {

    state = { data: { symbol: '', profile: { price: '', companyName: '' } }, value: 1, price: 0 };

    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
     }

    //function when - button pressing increse quantity of stock
    handleMinus = () => {
        let { data } = this.state;
        let result = (this.state.value > 1 &&  this._isMounted )?  this.setState({ value: this.state.value - 1 }, () => this.changePrice()) : null;
    }

    //function when + button pressing increse quantity of stock

    handlePlus = () => {
        let { data } = this.state;
        this._isMounted && this.setState({ value: this.state.value + 1 }, () => this.changePrice());
    }


    changePrice = () => {
        let { data } = this.state;
        let price = this.state.value * data.profile.price;
        this._isMounted &&  this.setState({ price });
    }


    //buy stock with given quantity and sending it to server api and cheking if response of buy will true will change balance

    handleBuy = () => {
        let { data } = this.state;
        let price = this.state.value * data.profile.price;
        this._isMounted &&  this.setState({ price }, async () => {
            let result = await this.getBalance();
            if(result>price){
                console.log(result);
            const response = await this.writeServer();
            if (response) {
                alert("you bought successfully, check your account");
                const response = fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4')
                    .then(data => data.json()).then(result => {
                        price = result.currentBalance - price;
                        this.updateBalance(price);
                        this.props.history.goBack();
                    }).catch(err => alert("something wrong please try again later"))
            } 
       } else {
        
           alert("not enough balance to buy");
       }});

    }


    async getBalance () {
        let result = 0;
        const response = await fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/4")
        .then(data => data.ok ? data.json() :null).then(data=> result = data.currentBalance).catch(err => alert("something wrong please try again later"));
        console.log(result);
        return result;
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

        this._isMounted &&     fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/4", options)
            .then(data => data.json()).catch(err => alert("something wrong please try again later"));
    }

    //writing data to server pruchase history and catching error while data is cant be buy


    async writeServer() {
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

        const response = await fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks", options).then(res => (res.status === 201) ? result = true : alert("something wrong please try again later"))
            .catch((err) => console.log(err));
        console.log(result);
        return result;
    }

    //getting each stock data in the page to buy

    getData = () => {
        let id = this.props.match.params.id;
        this._isMounted &&   fetch(`https://financialmodelingprep.com/api/v3/company/profile/${id}`).then(data => data.json()).then(data => {
            let price = data.profile.price;
            this._isMounted && this.setState({ data, price })
        }).catch(err => alert("something wrong please try again later"));
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
                    <div style={{left: '5%'}}><i className="glyphicon glyphicon-menu-left"></i><button onClick={() => this.props.history.goBack()}>Back</button></div>
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