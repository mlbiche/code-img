/**
 * RegistrationView component
 * 
 * Define the registration form
 */

import React, { Component } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { registerUser } from '../services/UserService';

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
    this.reinitialiseForm = this.reinitialiseForm.bind(this);
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
    // Prevent the page refreshing, not needed in single page web application
    event.preventDefault();

    // Register the new user
    registerUser(this.state.username, this.state.email, this.state.password)
      .then(statusCode => {
        // Reinitialise the form as the data has been fetched
        this.reinitialiseForm();

        switch (statusCode) {
          case 201:
            // Show the success alert
            this.setState({
              message: 'Account created successfully.',
              messageCode: statusCode
            });
            break;
          case 409:
            // Show the wrong credentials alert
            this.setState({
              message: 'Account already exists.',
              messageCode: statusCode
            });
            break;
          case 500:
            // Show the internal error alert
            this.setState({
              message: 'Fail to create account.',
              messageCode: statusCode
            });
            break;
          default:
            break;
        }
      })
      .catch(err => {
        console.log('Registration fetch error');
        console.log(err);
      });
  };

  /**
   * Reinitialise the form inputs and the the state
   */
  reinitialiseForm() {
    // Empty the fileds
    this.emailInput.value = '';
    this.usernameInput.value = '';
    this.passwordInput.value = '';

    // Reinitialise the state
    this.setState({
      email: '',
      password: '',
      username: ''
    });
  }

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