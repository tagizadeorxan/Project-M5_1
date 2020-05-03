import React, {Component} from 'react';
import './ShowDiffer.css';

class ShowDiffer extends Component {
    render() {
        if(!this.props.data) {          //  Data Check
            return (null);
        }
        const {first, second} = this.props.data;        
        return (
            <div className="show-differ">
                {
                    (first > 0 && second > 0) ?         //  Display positive changes(green)
                    <span className="ShowDiffer-color-green">&#9650; +{first}$ (+{second}%)</span> 
                    :
                    (first < 0 && second < 0) ?         //  Display negative changes(red)
                    <span className="ShowDiffer-color-red">&#9660; {first}$ ({second}%)</span>
                    :
                    <span>&#9670; {0}$ ({0}%)</span>    //  Display neutral changes(black)
                }
            </div>
        )
    }
}

export default ShowDiffer;