import React, {Component} from 'react';

class Buy extends Component {

state = {data:{}};


componentDidMount() {
    this.getData();
}

getData = () => {
    let id = this.props.match.params.id;
    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${id}`).then(data=>data.json()).then(data=>this.setState({data}));
}

    render() {
        let {data} = this.state;
      console.log(data.profile);
        return (
            <div>
               {/* <p>{data.symbol}</p>
               <p>{data.profile.price}</p>
               <p>{data.profile.beta}</p>
               <p>{data.profile.volAvg}</p>
               <p>{data.profile.mktCap}</p>
               <p>{data.profile.range}</p>
               <p>{data.profile.changes}</p>
               <img atl-text="id" src={data.profile.image}/>
               <p>{data.profile.price}</p>
               <p>{data.profile.price}</p> */}

            </div>
           
        )
    }
}

export default Buy;