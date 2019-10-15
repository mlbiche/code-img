/**
 * LoginView component
 * 
 * Define the login form
 */

import React, { Component } from 'react';
import { Form, Container, Col, Row, Button, Alert } from 'react-bootstrap';

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

    // Fetch the Form data
    fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' // Allow to receive a Cross-Origin cookie
    })
      .then(res => {
        // Empty the Form
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
      <Container className="my-5">
        {/* Login feedback alerts */}
        <Row>
          <Col>
            {
              <Alert variant={this.state.messageCode === 200 ? 'success' : 'danger'}>
                {this.state.message}
              </Alert>
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