import React, { Component } from 'react';

class ChallangeCalculateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            commission:0
        };

        this.submitCalculate = this.submitCalculate.bind(this);
        this.changeCalculte = this.changeCalculte.bind(this);
    }

    changeCalculte(event) {
        this.setState({value: event.target.value});
    }

    submitCalculate(event) {
        console.log(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
            <form onSubmit={this.submitCalculate} >
                <label>
                    Sales($):
                <input type="number" onChange={this.changeCalculte} />
                </label>
                <input type="submit" value="Calculate" />
            </form>
            <p>Your commission is: ${this.state.commission}</p>
            </div>
        );
    }

}


export default ChallangeCalculateView;