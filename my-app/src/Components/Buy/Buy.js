import React, {Component} from 'react';

class Buy extends Component {

state = {data:{symbol:'',profile:{price:'',beta:'',image:'',companyName:''}}};

constructor(props){
    super(props);
    this.getData();
}



getData = () => {
    let id = this.props.match.params.id;
    console.log(this.props);
    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${id}`).then(data=>data.json()).then(data=>this.setState({data}));
}

    render() {
        let {data} = this.state;
   
        return (
            <div>
                <button onClick={()=>this.props.history.goBack()}>Back</button>
               <p>{data.symbol}</p>
               <p>{data.profile.price}</p>
               <p>{data.profile.beta}</p>
               <img atl="id" src={data.profile.image}/>
    
            </div>
           
        )
    }
}

export default Buy;