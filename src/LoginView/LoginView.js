import React, { Component } from 'react';
import './LoginView.css';
class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.submitLogin = this.submitLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    changeEmail(event) {
        this.setState({ email: event.target.value });
    }

    submitLogin (e) {
        e.preventDefault();
      };
    render() {
        return (
            <div className="form-wrapper">
                <form onSubmit={this.submitLogin}>
                    <label>
                        Email:
                <input type="email" placeholder="Enter your email" name="email" onChange={this.changeEmail} />
                    </label>
                    <label>
                        Password:
                <input type="password" placeholder="Enter your password" name="password" onChange={this.changePassword} />
                    </label>
                    <input type="submit" value="Login" className="login" />
                </form>
            </div>
        );
    }
}
export default LoginView;