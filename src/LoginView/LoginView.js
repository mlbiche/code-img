import React, { Component } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';

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

    // Fetch the Form data
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
      <Container>
        <Row>
          <Col>
            {/* Developped using https://stackoverflow.com/a/24534492/7916042 */}
            {
              this.state.showConnectionSuccessAlert &&
              (<label for="FormControlRange">You are successfully connected ! </label>)
            }
            {
              this.state.showConnectionWrongCredentialsAlert &&
              (<label for="FormControlRange">You have entered wrong email or password.</label>)
            }
            {
              this.state.showConnectionServerFailAlert &&
              (<label for="FormControlRange">Your connection has failed because of an internal error.</label>)
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.submitLogin}>
              <Form.Group controlId="login-form-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                  ref={(ref) => this.emailInput = ref}
                  onChange={this.changeEmail} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="login-form-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                  ref={(ref) => this.passwordInput = ref}
                  onChange={this.changePassword} />
              </Form.Group>
              <Button variant="primary" type="submit" value="Login" />
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default LoginView;