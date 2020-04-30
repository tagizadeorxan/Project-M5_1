import React, {Component} from 'react';

class Buy extends Component {
    render() {
        return (
            <p>{console.log(this.props.match.params)}</p>
        )
    }
}

export default Buy;