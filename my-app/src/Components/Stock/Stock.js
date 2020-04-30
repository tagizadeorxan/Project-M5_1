import React, {Component} from 'react';
import EachStock from './eachStock/EachStock';
import './stock.css';



class Stock extends Component {
    state={
        data:[],
        pageSize: 4,
        currentPage: 1,
        lastPage:'',
        pageNumChange:true
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

    pageHandler=(e)=>{
        this.setState({
            currentPage: e.target.innerText,
        })
    }

    render() {
        const { data, pageSize, currentPage,lastPage } = this.state;
        console.log(this.state.lastPage)
        return (
            <div className='stock'>
                <div className='stock-input'>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 68">
                <circle id="Ellipse 2" cx="9.375" cy="9.375" r="8.375" stroke="black" stroke-width="2"/>
                <line id="Line 8" x1="15.7071" y1="15.5429" x2="20.7071" y2="20.5429" stroke="black" stroke-width="2"/>
                </g>
                </svg>
                <input  type='text' placeholder='enter company ticker'></input>
                </div>
                <div className='stock-arr'>
                    {data
                    .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                    .map((res,i) => {
                    return <EachStock key={i} data={res}/>
                        })
                    }
                </div>
                <div className='btn-group'>
                    <button type='button' onClick={this.decreasePage}><i class="fa fa-angle-left"></i></button>
                    <button className = 'purple' type='button' onClick={this.pageHandler} >{+currentPage}</button>
                    <button type='button' onClick={this.pageHandler} >{+currentPage+1}</button>
                    <button type='button' onClick={this.pageHandler} >{+currentPage+2}</button>
                    <button type='button' onClick={this.pageHandler} >{+currentPage+3}</button>
                    <button type='button' >...</button>
                    <button type='button' >{lastPage}</button>
                    <button type='button' onClick={this.increasePage}><i class="fa fa-angle-right"></i></button>
                </div>
           </div>
        )
    }
}

export default Stock;