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

  submitLogin(e) {  
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' // Allow to receive a Cross-Origin cookie
    })
      .then((res) => {
        // TODO : Handle the response
      });
  };

  render() {
    return (
      <div>
        <p id="connection-success-alert">You are successfully connected !</p>
        <p id="connection-wrong-credentials-alert">You have entered wrong email or password.</p>
        <p id="connection-server-fail-alert">Your connection has failed because of an internal error.</p>
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
      </div>
    );
  }
}
export default LoginView;