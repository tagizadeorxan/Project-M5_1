import React, {Component, useReducer} from 'react';
import ShowDiffer from './ShowDiffer/ShowDiffer';
import EachAccountData from './EachAccountData/EachAccountData';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css
import './Account.css';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            globalAccountSum: 0,
            globalSumChange: 0,
            globalPercentChange: 0,
            data: {},
            actualData: [],
            pageSize: 4,
            currentPage: 1,
            lastPage: 1
        }
    }

    componentDidMount() {
        this.getAccountData();
    }

    getAccountData = async() => {
        try {
            const response = await fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks');
            const data = await response.json();
            if(!data.length) {
                return;
            }
            this.setState( {
                data, 
                lastPage: +Math.ceil(data.length / this.state.pageSize)
            }, this.globalAccFind);
        }
        catch(err) {
            console.log(err);
        }
    }

    globalAccFind = () => {
        let totalAccountSum = 0;
        const urlsToFetch = [];
        const {data} = this.state;
        // console.log(data);
        data.forEach(element => {
            totalAccountSum += Number(element.amount);
            urlsToFetch.push(`https://financialmodelingprep.com/api/v3/company/profile/${element.code}`);
        });
        this.setState({ globalAccountSum: totalAccountSum });
        this.getActualData(urlsToFetch);
    }

    getActualData = async(urlsArray) => {
        try {
            const actualData = [];
            const uniqueArray = [...new Set(urlsArray)];
            uniqueArray.forEach(async(element) => {
                const response = await fetch(element);
                actualData.push(await response.json());
            })
            // console.log(actualData);
            this.setState({actualData}, ()=> {
                const {actualData, data} = this.state;
                // Updae here diff in h2
                // ...
            });
        }
        catch(error) {
            console.log(error);
        }
    }

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
    }

    render() {
        const {globalAccountSum, globalSumChange, globalPercentChange, data, currentPage, lastPage, pageSize, actualData} = this.state;
        const splitString = String(globalAccountSum.toFixed(2)).split('.');
        return (
            <div>
                <div className="Account-header">
                    <h1 className="Account-header-center">
                        <div>
                            <span className="Account-balance-integer-part">{splitString[0]}</span>
                            <span className="Account-balance-decimal-part">.{splitString[1]}$</span>
                        </div>
                        
                    </h1>
                    <h2 className="Account-header-center">
                        <ShowDiffer data={{first: globalSumChange, second: globalPercentChange}} />
                    </h2>
                </div>   
                <div className="Account-content">
                    {
                        (data.length && actualData.length) && 
                        data.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((element, index) => {
                            return (
                                <EachAccountData key={index} getDifFunction={this.getAccData} data={element}/>
                            )
                        })
                    }

                    <div className="Account-list">
                        {
                            (data.length && actualData.length) && 
                            <Pagination 
                                currentPage={currentPage}
                                totalPages={lastPage}
                                changeCurrentPage={this.changeCurrentPage}
                                theme="bottom-border"
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;