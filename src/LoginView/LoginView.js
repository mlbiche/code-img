/**
 * LoginView component
 * 
 * Define the login form
 */

import React, { Component } from 'react';
import { Form, Container, Col, Row, Button, Alert } from 'react-bootstrap';
import { loginUser } from '../services/UserService';

/**
 * LoginView component
 */
class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: '',
      messageCode: ''
    };

    this.submitLogin = this.submitLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
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
   * Submit the login data
   * @param event The submission event
   */
  submitLogin(event) {
    // Prevent page refreshing, not needed in single page web application
    event.preventDefault();

    // Login the user
    loginUser(this.state.email, this.state.password)
      .then(statusCode => {
        // Reinitialise the form as the data has been fetched
        this.reinitialiseForm();

        switch (statusCode) {
          case 200:
            // Show the success alert
            this.setState({
              message: 'You are successfully connected!',
              messageCode: statusCode
            });
            break;
          case 422:
          case 401:
            // Show the wrong credentials alert
            this.setState({
              message: 'You have entered wrong email or password.',
              messageCode: statusCode
            });
            break;
          case 500:
            // Show the internal error alert
            this.setState({
              message: 'Your connection has failed because of an internal error.',
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
    this.passwordInput.value = '';

    // Reinitialise the state
    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
    return (
      <Container className="my-5">
        {/* Login feedback alerts */}
        <Row>
          <Col>
            {
              this.state.message &&
              (
                <Alert variant={this.state.messageCode === 200 ? 'success' : 'danger'}>
                  {this.state.message}
                </Alert>
              )
            }
          </Col>
        </Row>
        {/* Login form */}
        <Row>
          <Col>
            <Form onSubmit={this.submitLogin}>
              {/* Email form group */}
              <Form.Group controlId="login-form-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={(ref) => this.emailInput = ref}
                  onChange={this.changeEmail} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              {/* Password form group */}
              <Form.Group controlId="login-form-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={(ref) => this.passwordInput = ref}
                  onChange={this.changePassword} />
              </Form.Group>
              <Button variant="primary" type="submit">Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginView;