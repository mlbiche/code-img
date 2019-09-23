import React, { Component } from 'react';
import { form } from 'react-bootstrap';

class RegistrationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      message: ''
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

  submitRegistration(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    // Post request to backend
    fetch('http://localhost:3000/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        newUser
      ),
    })
      .then(res => {
        // Empty the fileds after registration
        this.emailInput.value = '';
        this.usernameInput.value = '';
        this.passwordInput.value = '';

        this.setState({ email: '', password: '' });

        switch (res.status) {
          case 201:
            // Show the success alert
            this.setState({
              message: "account create successfully"
            });
            break;
          case 409:
            // Show the wrong credentials alert
            this.setState({
              message: "account already exists"
            });
            break;
          case 500:
            // Show the internal error alert
            this.setState({
              message: "fail to create account"
            });
            break;
          default:
            break;
        }
      }).catch(error => {
        console.log('signup error: ');
        console.log(error)
      });
  };

  render() {
    return (
      <div>
        {/* <p>{this.state.message}</p> */}
        <label for="formControlRange"> {this.state.message}</label>
        <form onSubmit={this.submitRegistration}>
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input placeholder="Enter your username"
              ref={(ref) => this.usernameInput = ref}
              name="username" onChange={this.changeUsername}
              type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" placeholder="Enter your password"
              ref={(ref) => this.passwordInput = ref} name="password" onChange={this.changePassword}
              class="form-control" id="exampleInputPassword1" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" placeholder="Enter your email" ref={(ref) => this.emailInput = ref}
              name="email" onChange={this.changeEmail}
              class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email address" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <input type="submit" class="btn btn-primary" value="Register" />
        </form>
      </div >
    );
  }
}
export default RegistrationView;