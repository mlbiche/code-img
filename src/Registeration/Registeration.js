import React, { Component } from 'react';

class Registeration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };

        this.submitRegistration = this.submitRegistration.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }

    changeUsername(event) {
        this.setState({ username: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    changeEmail(event) {
        this.setState({ email: event.target.value });
    }

    submitSaveData(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitRegistration}>
                    <label>
                        Username:
                <input type="text" placeholder="Enter your username" name="username" onChange={this.changeUsername} />
                    </label>
                    <label>
                        Password:
                <input type="password" placeholder="Enter your password" name="password" onChange={this.changePassword} />
                    </label>

                    <label>
                        Email:
                <input type="text" placeholder="Enter your email" name="email"  onChange={this.changeEmail}/>
                    </label>
                    <input type="submit" value="Register" />
                </form>


            </div >
        );
    }
}
export default Registeration;