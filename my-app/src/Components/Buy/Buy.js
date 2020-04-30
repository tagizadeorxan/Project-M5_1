import React, {Component} from 'react';
import './Buy.css';

class Buy extends Component {

state = {data:{symbol:'',profile:{price:'',companyName:''}},value:1,price:0};

constructor(props){
    super(props);
    this.getData();
}

handleMinus = () => {
   let result = this.state.value>1? this.setState({value:this.state.value-1}): null;
}

handlePlus = () =>{
    this.setState({value:this.state.value+1});
}

handleBuy = () => {

    let {data} = this.state;

    let price = this.state.value*data.profile.price;
    this.setState({price});



    let options = {
        method:'POST',
        headers: {'Content-type': 'application/json'},
        
        body: JSON.stringify({
            amount: data.profile.price,
            code: data.symbol,
            purchasePrice: this.state.price,
        })
       
    }
 
    fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks",options).then(res=>res.json()).then(res=>console.log(res));
}

delete = () =>{

    fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks/${44}`, {
        method:'DELETE',
    })

}

getData = () => {
    let id = this.props.match.params.id;
    console.log(this.props);
    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${id}`).then(data=>data.json()).then(data=>{
        
    let price = data.profile.price;
    
    this.setState({data,price})
    });
}

    render() {
        let {data} = this.state;
        let splitstring = String(data.profile.price).split('.');
        let splitstring2 = String(this.state.price).split('.');
        console.log(this.state.price)
        return (
            <div>
            <div className="buy-header">
                <button onClick={()=>this.props.history.goBack()}>Back</button>
               <p>{data.profile.companyName}</p>
            </div>

              <div className="buy-defaut-price"><p>{splitstring[0]}.</p><span>{splitstring[1]}$</span></div> 
                <div className="buy-quantity">
                    <button onClick={this.handleMinus}>-</button>
                    <span>{this.state.value}</span>
                    <button onClick={this.handlePlus}>+</button>
                </div>
                <div className="buy-price"><div>Buy for</div><div> {splitstring2[0]}.</div><div>{splitstring2[1]}$</div></div>
               <div className="buy-button" > <button onClick={this.handleBuy}>Buy</button></div>
                <button onClick={this.delete}>delete</button>
            </div>
           
        )
    }
}

export default Buy;