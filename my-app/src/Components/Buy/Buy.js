import React, { Component } from 'react';
import './Buy.css';
import DatePicker from './DatePicker';

class Buy extends Component {

    state = { data: { symbol: '', profile: { price: '', companyName: '' } }, value: 1, price: 0 };

    constructor(props) {
        super(props);
        this.getData();
    }

    handleMinus = () => {
        let { data } = this.state;
        let price = this.state.value * data.profile.price;
        let result = this.state.value > 1 ? this.setState({ value: this.state.value - 1 },()=> this.changePrice()) : null;
        
    }

    handlePlus = () => {
        let { data } = this.state;
        this.setState({ value: this.state.value + 1},()=> this.changePrice());
       
       
        
    }


    changePrice = () =>{
        let { data } = this.state;
        let price = this.state.value * data.profile.price;
        this.setState({price});
    }
    


    handleBuy = () => {
        let { data } = this.state;
        let price = this.state.value * data.profile.price;
        this.setState({ price }, () => { this.writeServer() });
        this.props.history.goBack();
    }

    writeServer = () => {
        let { data } = this.state;

        let options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                amount: data.profile.price,
                code: data.symbol,
                purchasePrice: this.state.price,
            })
        }
        fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks", options).then(res => res.json()).then(res => console.log(res));
    }




    // delete = () =>{

    //     fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks/${44}`, {
    //         method:'DELETE',
    //     })

    // }

    getData = () => {
        let id = this.props.match.params.id;
        
        fetch(`https://financialmodelingprep.com/api/v3/company/profile/${id}`).then(data => data.json()).then(data => {

            let price = data.profile.price;

            this.setState({ data, price })
        });
    }

    render() {
        let { data } = this.state;
        let numberOne = Number(data.profile.price).toFixed(2);
        let numberTwo = Number(this.state.price).toFixed(2);
        let splitstring = String(numberOne).split('.');
        let splitstring2 = String(numberTwo).split('.');
        
        return (
            <div className="main">

                <div class="container">
                    <div><i class="glyphicon glyphicon-menu-left"></i><button onClick={() => this.props.history.goBack()}>Back</button></div>
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
                    <DatePicker symbol={this.state.data.symbol}/>
            </div>

        )
    }
}

export default Buy;