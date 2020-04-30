import React, {Component} from 'react';
import ShowDiffer from './ShowDiffer/ShowDiffer';
import EachAccountData from './EachAccountData/EachAccountData';
import './Account.css';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            globalAccountSum: 0,
            globalSumChange: 1,
            globalPercentChange: 1,
            data: {},
            pageSize: 4,
            currentPage: 1
        }
    }

    componentDidMount() {
        this.getAccountData();
    }

    getAccountData = async() => {
        const response = await fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks');
        const data = await response.json();
        this.setState({data}, this.globalAccFind);
    }

    globalAccFind = () => {
        console.log(this.state.data);
    }

    render() {
        const {globalAccountSum, globalSumChange, globalPercentChange} = this.state;
        return (
            <div>
                <div className="Account-header">
                    <h1 className="Account-header-center"><span>{globalAccountSum}</span>$</h1>
                    <h2 className="Account-header-center">
                        <ShowDiffer data={{first: globalSumChange, second: globalPercentChange}} />
                    </h2>
                </div>   

                <div className="Account-content">
                      {
                          
                      }
                </div>
            </div>
        )
    }
}

export default Account;