import React, {Component} from 'react';
import './Buy';

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
        


        body: JSON.stringify({
            code: data.symbol,
            amount: data.profile.price,
            purchasePrice: data.price
        })
       
    }
    console.log(options);

    fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks",options);
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
   
        return (
            <div>
                <button onClick={()=>this.props.history.goBack()}>Back</button>
               <p>{data.profile.companyName}</p>
               <p>{data.profile.price}</p>
                <div>
                    <button onClick={this.handleMinus}>-</button>
                    <span>{this.state.value}</span>
                    <button onClick={this.handlePlus}>+</button>
                </div>
                <button onClick={this.handleBuy}>Buy</button>
            </div>
           
        )
    }
}

export default Buy;