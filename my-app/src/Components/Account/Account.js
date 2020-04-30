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
        const response = await fetch('');
        const data = await response.json();
        this.setState({data});

    }

    render() {
        return (
            <div>
                <div className="Account-header">
                    <h1 className="Account-header-center"><span>{this.state.globalAccountSum}</span>$</h1>
                    <h2 className="Account-header-center"><ShowDiffer data={{first: this.state.globalSumChange, second: this.state.globalPercentChange}} /></h2>
                </div>   

                <div className="Account-content">
                      
                </div>
            </div>
        )
    }
}

export default Account;