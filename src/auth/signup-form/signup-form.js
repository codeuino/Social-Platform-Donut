import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./signup-form.scss";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import { withRouter } from "react-router-dom";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      shortDescription: "",
      password: "",
      cnfPassword: "",
      error: { msg: "" },
      isValidEmail: true,
      isValidFirstName: true,
      isValidLastName: true,
      isValidPassword: true,
      isValidPhone: true,
      isValidDesc: true,
      isMatched: true,
      isValidForm: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error?.msg?.length > 0) {
      this.setState({
        error: {
          msg: "Something went wrong, Please recheck the input!",
        },
      });
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateFields(name, value);
    });
  };

  validateFields = (fieldName, value) => {
    const {
      isMatched,
      isValidDesc,
      isValidEmail,
      isValidPassword,
      isValidFirstName,
      isValidLastName,
      isValidPhone,
    } = this.state;

    let validPass = isValidPassword;
    let validEmail = isValidEmail;
    let validDesc = isValidDesc;
    let validPhone = isValidPhone;
    let matched = isMatched;
    let validFirstName = isValidFirstName;
    let validLastName = isValidLastName;

    switch (fieldName) {
      case "firstName": {
        validFirstName = (value.match(/^[a-z][a-z]+[ ]{1}[a-z]*$/i) && value.length<15) ;
      break;
      }
      case "LastName": {
        validLastName = value.length<15 && value.match(/^[a-z]+/);
      break;
      }
      case "email": {
        validEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      }
      case "password": {
        validPass = value.length >= 6;
        break;
      }
      case "phone": {
        validPhone = value.match(/^*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?*$/);
        break;
      }
      case "shortDescription": {
        validDesc = value.length >= 10 && value<=250;
        break;
      }
      case "cnfPassword": {
        matched = this.state.password === value.toString();
        break;
      }
      default:
        break;
    }

    this.setState(
      {
        isMatched: matched,
        isValidEmail: validEmail,
        isValidDesc: validDesc,
        isValidPassword: validPass,
        isValidPhone: validPhone,
        isValidFirstName :validFirstName,
        isvalidLastName  :validLastName
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const {
      isMatched,
      isValidDesc,
      isValidEmail,
      isValidPassword,
      isValidPhone,
      isValidLastName,
      isValidFirstName
    } = this.state;

    if (
      isMatched &&
      isValidDesc &&
      isValidEmail &&
      isValidPassword &&
      isValidFirstName &&
      isValidLastName &&
      isValidPhone
    ) {
      this.setState({ isValidForm: true });
    } else {
      this.setState({ isValidForm: false });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phone,
      shortDescription,
      password,
      isValidForm,
    } = this.state;
    if (isValidForm) {
      const newUser = {
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        phone: phone,
        password: password,
        info: {
          about: {
            shortDescription: shortDescription,
          },
        },
      };
      this.props.registerUser(newUser, this.props.history);
    } else {
      this.setState({
        error: { msg: "Something went wrong, please check the input!" },
      });
    }
  };

  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
    }));
    const {
      firstName,
      lastName,
      email,
      phone,
      shortDescription,
      password,
      cnfPassword,
      isValidPassword,
      isValidFirstName,
      isValidLastName,
      isValidEmail,
      isValidPhone,
      isValidDesc,
      // isMatched,
      // isValidForm,
      // error,
    } = this.state;

    return (
      <div className="signup-details">
        <Form className={useStyles.root} onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={firstName}
                  type="text"
                  placeholder = "First Name"
                  name="firstName"
                  onChange={this.onChange}
                  required
                />
                <ul className="list-unstyled">
                  <li id="validation_msg">
                    {!isValidFirstName ? "Invalid Name!" : null}
                  </li>
                </ul>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={lastName}
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.onChange}
                  required
                />
                <ul className="list-unstyled">
                  <li id="validation_msg">
                    {!isValidLastName ? "Invalid Name!" : null}
                  </li>
                </ul>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.onChange}
                  required
                />
                <ul className="list-unstyled">
                  <li id="validation_msg">
                    {!isValidEmail ? "Invalid email!" : null}
                  </li>
                </ul>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>
              <ul className="list-unstyled">
                <li id="validation_msg">
                  {!isValidPhone ? "Invalid phone number!" : null}
                </li>
              </ul>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Short bio"
              name="shortDescription"
              value={shortDescription}
              onChange={this.onChange}
              required
            />
            <ul className="list-unstyled">
              <li id="validation_msg">
                {!isValidDesc ? "Should be at least 10 characters long and less then 250 charecters!" : null}
              </li>
            </ul>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  type="password"
                  placeholder="*******"
                  name="password"
                  onChange={this.onChange}
                  required
                />
              </Form.Group>
              <ul className="list-unstyled">
                <li id="validation_msg">
                  {!isValidPassword
                    ? "Should be at least 6 characters long!"
                    : null}
                </li>
              </ul>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*******"
                  name="cnfPassword"
                  value={cnfPassword}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>
              <ul className="list-unstyled">
                <li id="validation_msg">
                  {/* {error?.msg.length > 0 ? error.msg : null} */}
                </li>
              </ul>
            </Col>
          </Row>
          <div className="cta-signup">
            <Button
              className="signupbtn"
              type="submit"
              variant="primary"
              color="primary"
            >
              <span className="signupbtn-text">SignUp</span>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(SignUpForm)
);
