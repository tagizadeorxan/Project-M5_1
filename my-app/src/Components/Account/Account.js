import React, {Component} from 'react';
import ShowDiffer from './ShowDiffer/ShowDiffer';
import EachAccountData from './EachAccountData/EachAccountData';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css
import './Account.css';
import '../../animations.css';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            globalActualSum: 0,
            globalAccountSum: 0,
            globalSumChange: 0,
            globalPercentChange: 0,
            data: [],
            actualData: [],
            pageSize: 4,
            currentPage: 1,
            lastPage: 1
        }
    }

    componentDidMount() {
        this.getAccountData();  
        setInterval(this.getAccountData, 60000);
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
            totalAccountSum += (Number(element.purchasePrice));
            urlsToFetch.push(`https://financialmodelingprep.com/api/v3/company/profile/${element.code}`);
        });
        this.setState({ globalAccountSum: totalAccountSum }, () => {  this.getActualData(urlsToFetch); });
       
    }

    getActualData = async(urlsArray) => {
        const uniqueUrls = [...new Set(urlsArray)];
        Promise.all(uniqueUrls.map(u => fetch(u)))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(actualData => {
            if(actualData.length === 0) {
                throw "Empty response from https://financialmodelingprep.com";
            }
            this.setState({actualData}, this.countGlobalPercentChange);
        })
        .catch(error => {
            alert(error);
        });
    }

    countGlobalPercentChange = () => {
        const {data, actualData} = this.state;
        let globalActualSum = 0;
        data.forEach(element => {
            const foundedActual = actualData.find(item => item.symbol === element.code );
            const countOfBoughtStocks = Math.round(element.purchasePrice / element.amount);
            globalActualSum += (foundedActual.profile.price) * countOfBoughtStocks;
        });
        this.setState({globalActualSum})
    }

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
    }

    render() {
        const {globalAccountSum,actualData, data, currentPage, lastPage, pageSize, globalActualSum} = this.state;
        const splitString = String(globalAccountSum.toFixed(2)).split('.');
        const globalDifference = globalActualSum - globalAccountSum ;
        const globalPercentDifference = ((globalDifference * 100)/globalAccountSum);
        return (
            <div>
                <div className="Account-header">
                    <h1 className="Account-header-center pulse">
                        <div>
                            <span className="Account-balance-integer-part">{splitString[0]}</span>
                            <span className="Account-balance-decimal-part">.{splitString[1]}$</span>
                        </div>
                        
                    </h1>
                    <h2 className="Account-header-center show-dif">
                        <ShowDiffer data={{first: globalDifference.toFixed(2), second: globalPercentDifference.toFixed(2)}} />
                    </h2>
                </div>   
                <div className="Account-content">
                    <div >
                        {
                            (data.length && actualData.length) ? 
                            data.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((element, index) => {
                                return (
                                    <EachAccountData key={index} data={element} actualData={actualData}/>
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