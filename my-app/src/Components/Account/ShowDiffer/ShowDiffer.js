import React, {Component} from 'react';
import './ShowDiffer.css';

class ShowDiffer extends Component {
    render() {
        const {first, second} = this.props.data;
        return (
            <div>
                {
                    first > 0 ?
                    <span className="ShowDiffer-color-green">&#9650; +{first}$ (+{second}%)</span>
                    :
                    first < 0 ?
                    <span className="ShowDiffer-color-red">&#9660; {first}$ ({second}%)</span>
                    :
                    <span>&#9670; {0}$ ({0}%)</span>
                }
            </div>
        )
    }
}

export default ShowDiffer;