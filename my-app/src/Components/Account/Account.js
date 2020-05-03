import React, {Component} from 'react';                             //  Get react
import ShowDiffer from './ShowDiffer/ShowDiffer';                   //  Get stock difference representer
import EachAccountData from './EachAccountData/EachAccountData';    //  Get each data-row
import Pagination from "react-pagination-library";                  //  Get pagination
import "react-pagination-library/build/css/index.css";              //  Get pagination-css
import './Account.css';                                             //  Get page css
import '../../animations.css';                                      //  Get css-animations

class Account extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;        // Property to track component mount status
        this.state = {
            globalActualSum: 0,         // Total amount based on current shares
            globalAccountSum: 0,        // Total amount based on users shares
            data: [],                   // User's data from server
            actualData: [],             // Current stocks from API
            pageSize: 4,                // The amount of data per page
            currentPage: 1,             // Starter page for pagination
            lastPage: 1                 // Last page for pagination
        }
    }

    //  Starting point for obtaining user data and current quotes from the exchange per minut
    componentDidMount() {
        this._isMounted = true;
        this.getAccountData();  
        this.intervalGuardian = setInterval(this.getAccountData, 60000);
    }

    //  Turn off data acquisition per minute
    componentWillUnmount() {
        clearInterval(this.intervalGuardian);
        this._isMounted = false;
    }

    //  Retrieve user's stock-portfolio data
    getAccountData = async() => {
        try {
            const response = await fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks');
            const data = await response.json();
            if(!data.length) {
                throw new Error("Network error!");                          
            }
            this._isMounted && this.setState({                              //  State changes when component mounted
                data,                                                       
                lastPage: +Math.ceil(data.length / this.state.pageSize)     //  Set last page for pagination 
            }, this.prepareUrlsForActualData);                                                                     
        }
        catch(error) {
            alert(error);
        }
    }

    //  Preparing urls for per stock and calculation of the user's stock amount
    prepareUrlsForActualData = () => {
        let totalAccountSum = 0;
        const urlsToFetch = [];
        const {data} = this.state;
        data.forEach(element => {
            totalAccountSum += (Number(element.purchasePrice));
            urlsToFetch.push(`https://financialmodelingprep.com/api/v3/company/profile/${element.code}`);
        });
        this._isMounted && this.setState({ globalAccountSum: totalAccountSum }, () => {  this.getActualData(urlsToFetch); });
    }

    //  Obtaining current stock quotes
    getActualData = async(urlsArray) => {
        const uniqueUrls = [...new Set(urlsArray)];                                         //  Get an array of unique elements 
        Promise.all(uniqueUrls.map(u => fetch(u)))                                          //  Sending a request for each unique url
        .then(responses => Promise.all(responses.map(res => res.json())))                   //  Processing all responses
        .then(actualData => {               
            if(actualData.length === 0) {
                throw new Error("Empty response from https://financialmodelingprep.com");
            }
            this._isMounted && this.setState({actualData}, this.countGlobalPercentChange);
        })
        .catch(error => {
            alert(error);
        });
    }

    //  Calculation of the global actual amount
    countGlobalPercentChange = () => {
        const {data, actualData} = this.state;
        let globalActualSum = 0;
        data.forEach(element => {
            const foundedActual = actualData.find(item => item.symbol === element.code );       //  Finding company via its actual data
            const countOfBoughtStocks = Math.round(element.purchasePrice / element.amount);     //  Get number of purchased stocks
            globalActualSum += (foundedActual.profile.price) * countOfBoughtStocks;             //  Get total amount based on current shares
        });
        this._isMounted && this.setState({globalActualSum})                                                        
    }

    //  Change current page for pagination
    changeCurrentPage = numPage => {
        this._isMounted && this.setState({ currentPage: numPage });
    }

    render() {
        const {globalAccountSum,actualData, data, currentPage, lastPage, pageSize, globalActualSum} = this.state;
        const splitString = String(globalAccountSum.toFixed(2)).split('.');
        const globalDifference = globalActualSum - globalAccountSum ;                       //  Get difference in currency between the current and user amounts
        const globalPercentDifference = ((globalDifference * 100)/globalAccountSum);        //  Get difference in percents between the current and user amounts
        return (
            <div className="Account-wrapper">
                <div className="Account-header">
                    <h1 className="Account-header-center">
                        <div className="pulse">
                            <span className="Account-balance-integer-part">{splitString[0]}</span>
                            <span className="Account-balance-decimal-part">.{splitString[1]}$</span>
                        </div>
                    </h1>
                    <h2 className="Account-header-center show-dif">
                        <ShowDiffer data={{first: globalDifference.toFixed(2), second: globalPercentDifference.toFixed(2)}} />
                    </h2>
                </div>   
                <div className="Account-content">
                    <div className="Account-each-account-set-wrapper">
                        {
                            (data.length && actualData.length) ? 
                            data.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((element, index) => {
                                return (
                                    <EachAccountData  key={index} data={element} actualData={actualData}/>                   
                                )
                            })
                            : null
                        }
                    </div>                   
                </div>
                <div className="Account-list">
                    {
                        (data.length && actualData.length) ? 
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={lastPage}
                            changeCurrentPage={this.changeCurrentPage}
                            theme="bottom-border"
                        /> 
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default Account;