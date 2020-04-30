import React,{Component} from 'react';
import './Balance.css';

class Balance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: 0
        }
    }


    componentDidMount() {
        // this.getBalance();
        setInterval(this.getBalance, 5000);
    }

    getBalance = async() => {
        const response = await fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4');
        const data = await response.json();
        this.setState({balance: data.currentBalance});
    }

    render() {
        const splitString = String(this.state.balance.toFixed(2)).split('.');
        console.log(splitString);
        return (
            <footer className="Balance">
                <div className="Balance-footer">
                    <div>Balance:</div>
                    <div className="box2">
                        <div className="balance-box">
                            <span className="Balance-integer-part">{splitString[0]}</span>
                            .
                            <span className="Balance-decimal-part">{splitString[1]}$</span>
                        </div>
                            
                    </div>
                </div>
            </footer>
        )
    }
}

export default Balance;