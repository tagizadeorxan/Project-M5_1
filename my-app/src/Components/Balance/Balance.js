import React,{Component} from 'react';  //  Get react
import './Balance.css';                 //  Get css for footer

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0
        }
    }

    //  Get amount from server per 5 second
    componentDidMount() {
        setInterval(this.getBalance, 5000);
    }

    //  Get data from user api
    getBalance = async() => {
        const response = await fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4');
        const data = await response.json();
        this.setState({balance: data.currentBalance});
    }

    render() {
        const splitString = String(this.state.balance.toFixed(2)).split('.');               //  Divide amount to integer & decimal parts
        return (
            <footer className="Balance">
                <div className="Balance-footer">
                    <div>Balance:</div>
                    <div className="balance-box">
                        <span className="Balance-integer-part">{splitString[0]}</span>
                        .
                        <span className="Balance-decimal-part">{splitString[1]}$</span>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Balance;