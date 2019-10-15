/**
 * RegistrationView component
 * 
 * Define the registration form
 */

import React, { Component } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';

/**
 * RegistrationView component
 */
class RegistrationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      message: '',
      messageCode: 0
    };

    this.submitRegistration = this.submitRegistration.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }

  /**
   * Username input callback on change
   * Update the state according to the username input
   * @param event The event object containing the new username
   */
  changeUsername(event) {
    this.setState({ username: event.target.value });
  }

  /**
   * Password input callback on change
   * Update the state according to the password input
   * @param event The event object containing the new password
   */
  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  /**
   * Email input callback on change
   * Update the state according to the email input
   * @param event The event object containing the new email
   */
  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  /**
   * Form submission callback
   * Submit the registration data
   * @param event The submission event
   */
  submitRegistration(event) {
    // Prevent the page reloading, not needed in single page web application
    event.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    // Post request to backend
    fetch('http://localhost:8080/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(res => {
        // Empty the fileds as the data has been submitted
        this.emailInput.value = '';
        this.usernameInput.value = '';
        this.passwordInput.value = '';

        // Reinitialise the state as the data has been submitted
        this.setState({
          email: '',
          password: ''
        });

        switch (res.status) {
          case 201:
            // Show the success alert
            this.setState({
              message: 'Account created successfully.',
              messageCode: res.status
            });
            break;
          case 409:
            // Show the wrong credentials alert
            this.setState({
              message: 'Account already exists.',
              messageCode: res.status
            });
            break;
          case 500:
            // Show the internal error alert
            this.setState({
              message: 'Fail to create account.',
              messageCode: res.status
            });
            break;
          default:
            break;
        }
      }).catch(error => {
        console.log('Signup error: ');
        console.log(error)
      });
  };

  render() {
    return (
      <Container className="my-5">
        {/* Registration feedback alert */}
        <Row>
          <Col>
            {
              this.state.message &&
              (
                <Alert variant={this.state.messageCode === 201 ? 'success' : 'danger'}>
                  {this.state.message}
                </Alert>
              )
            }
          </Col>
        </Row>
        {/* Registration form */}
        <Row>
          <Col>
            <Form onSubmit={this.submitRegistration}>
              {/* Username form group */}
              <Form.Group controlId="registration-form-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  ref={(ref) => this.usernameInput = ref}
                  onChange={this.changeUsername} />
              </Form.Group>
              {/* Email form group */}
              <Form.Group controlId="registration-form-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  ref={(ref) => this.emailInput = ref}
                  onChange={this.changeEmail} />
              </Form.Group>
              {/* Password form group */}
              <Form.Group controlId="registration-form-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  ref={(ref) => this.passwordInput = ref}
                  onChange={this.changePassword} />
              </Form.Group>
              <Button type="submit" variant="primary">Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegistrationView;