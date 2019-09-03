import React, { Component } from 'react';

class ChallangeCalculateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            result: 0
        };

        this.submitCalculate = this.submitCalculate.bind(this);
        this.changeCalculte = this.changeCalculte.bind(this);
    }

    changeCalculte(event) {
        this.setState({ value: event.target.value });
    }

    submitCalculate(event) {
        const value = this.state.value;

        const result = fetch('http://localhost:3000/calculate', {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                value: value
            }),
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            return response.text();
        })
        .then((response) => {
            console.log(response);
        });


        // this.setState({result: result});

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
                <p>Your commission is: ${this.state.result}</p>
            </div>
        );
    }

}


export default ChallangeCalculateView;