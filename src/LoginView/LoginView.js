import React, { Component } from 'react';

// import './LoginView.css';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showConnectionSuccessAlert: false,
      showConnectionWrongCredentialsAlert: false,
      showConnectionServerFailAlert: false,
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
    // Hide all the slerts
    this.setState({
      showConnectionSuccessAlert: false,
      showConnectionWrongCredentialsAlert: false,
      showConnectionServerFailAlert: false
    });

    // Prevent page refreshing
    e.preventDefault();

    // Fetch the form data
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' // Allow to receive a Cross-Origin cookie
    })
      .then(res => {
        // Empty the form
        this.emailInput.value = '';
        this.passwordInput.value = '';
        this.setState({ email: '', password: '' });

        switch (res.status) {
          case 200:
            // Show the success alert
            this.setState({ showConnectionSuccessAlert: true });
            break;
          case 422:
          case 401:
            // Show the wrong credentials alert
            this.setState({ showConnectionWrongCredentialsAlert: true });
            break;
          case 500:
            // Show the internal error alert
            this.setState({ showConnectionServerFailAlert: true });
            break;
          default:
            break;
        }
      });
  };

  render() {
    return (
      <div>
        <div>
          {/* Developped using https://stackoverflow.com/a/24534492/7916042 */}
          {this.state.showConnectionSuccessAlert &&
            (<label for="formControlRange">You are successfully connected ! </label>)
          }
          {this.state.showConnectionWrongCredentialsAlert &&
            (<label for="formControlRange">You have entered wrong email or password.</label>)
          }
          {this.state.showConnectionServerFailAlert &&
            (<label for="formControlRange">Your connection has failed because of an internal error.</label>)
          }

          {/* <div className="form-wrapper"> */}
        </div>
        <form onSubmit={this.submitLogin}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            {/* <label>
              Email: */}
            <input ref={(ref) => this.emailInput = ref} type="email" type="email"
              placeholder="Enter your email" name="email"
              onChange={this.changeEmail} class="form-control" id="exampleInputEmail1" />
            {/* </label> */}
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            {/* <label> */}
            <label for="exampleInputPassword1">Password</label>
            <input ref={(ref) => this.passwordInput = ref} type="password"
              placeholder="Enter your password" name="password"
              onChange={this.changePassword} class="form-control" id="exampleInputPassword1" />
          </div>
          {/* </label> */}
          <input type="submit" value="Login" class="btn btn-primary" />
        </form>
        {/* </div> */}
        {/* </div > */}
      </div>
    );
  }
}
export default LoginView;