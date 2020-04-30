import React, {Component} from 'react';
import EachStock from './eachStock/EachStock';
import './stock.css';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css



class Stock extends Component {
    state={
        data:[],
        filteredData:[],
        pageSize: 4,
        currentPage: 1,
        lastPage:'',
        pageNumChange:true,
        searchInput:''
    }
    componentDidMount(){
        this.getData()
    }
    
    getData = () => {
          fetch("https://financialmodelingprep.com/api/v3/company/stock/list")
            .then(res => res.json())
            .then(data => this.setState({ data: data.symbolsList,
                                        lastPage: +Math.ceil(data.symbolsList.length / this.state.pageSize)}));
    }

    increasePage = () => {
        if (this.state.currentPage !== this.state.lastPage) {
            this.setState({ 
                currentPage: this.state.currentPage + 1,
            });
        }
    }

    decreasePage = () => {
        if (this.state.currentPage !== 1) {
        this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    stockFilterHandler=(e)=>{
        const filtered=this.state.data.filter((item)=>{
            return e.target.value.toUpperCase() == item.symbol
        })
        this.setState({
            searchInput: e.target.value,
            filteredData: filtered,

        })
    }

    // pageHandler=(e)=>{
    //     this.setState({
    //         currentPage: +(e.target.innerText),
    //     })
    // }

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        //fetch a data
        //or update a query to get data
    };

    render() {
        const { data, pageSize, currentPage,lastPage,searchInput,filteredData } = this.state;
        return (
            <div className='stock'>
                <div className='stock-input'>
                <img src={'/assets/search-logo.png'}/>
                <input onInput={this.stockFilterHandler} type='text' placeholder='enter company ticker'></input>
                </div>
                <div className='stock-arr'>
                    {(searchInput.length>0?filteredData:data)
                    .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                    .map((res,i) => {
                    return <EachStock key={i} data={res}/>
                        })
                    }
                </div>
                
                <div className="list">
                {
                    (!searchInput.length > 0) && 
                    <Pagination 
                        currentPage={this.state.currentPage}
                        totalPages={lastPage}
                        changeCurrentPage={this.changeCurrentPage}
                        theme="bottom-border"
                    />
                }
                </div>
            </div>
        )
    }
}

export default Stock;