import React, { Component } from "react";
import Popups from '../../common/Popups';
import { Form, Button } from "react-bootstrap";
import "./login-form.scss";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
import * as auth from "../auth-service";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalShow: false,
      option: "",
      optionValue: ""
    };

    
  }


  //     const handleToggle = (e) => {
//       const targetName = e.target.name;
//       this.setState({
//         modalShow: true,
//         option: targetName
//       });
//       setOptionValue(targetName);
//     }

  handleChange = (event, params) => {
    event.preventDefault();
    params === "email"
      ? this.setState({ email: event.target.value })
      : this.setState({ password: event.target.value });
  };

  checkValidation = () => {
    if (this.state.email.includes("@") && this.state.email.includes(".")) {
      return true;
    }
    return false;
  };

  authorizeUser = event => {
    event.preventDefault();
    const isValidated = this.checkValidation();
    if (isValidated) {
      auth
        .loginIn(this.state)
        .then(response => {
          const decodedToken = auth.decodeResponse(response.data.token);
          this.setSession(decodedToken);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  setSession = token => {
    const id = token.payload._id;
    cookie.save("userId", id, { path: "/" });
    this.props.history.push("/dashboard");
  };

  render() {

        const handleToggle = (e) => {
      const targetName = e.target.name;
      this.setState({
        modalShow: true,
        option: targetName
      });
  
    }
    return (
      <div className="login-details">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="abc@gmail.com"
              name="email"
              onChange={event => this.handleChange(event, "email")}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="***********"
              name="password"
              onChange={event => this.handleChange(event, "password")}
            />
          </Form.Group>
          <div className="cta-login">
            <Button
              variant="primary"
              type="submit"
              onClick={this.authorizeUser}
            >
              Login
            </Button>
          </div>
        </Form>
        <a className ="forgot-password" href="javascript:void(0)" onClick={handleToggle} name="password">Forgot Password?</a>
 
        <Popups 
        option={this.state.option}
        optionValue={this.state.optionValue}
        modalShow={this.state.modalShow}
      />
        </div>
     
 
    );
  }
}

export default withRouter(LoginForm);





