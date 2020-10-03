import React from "react";
import { Card, Form, Image } from "react-bootstrap";
import "styles/adminLoginScreen.scss";
import LockSVG from "assets/lock.svg";
import validator from "validator";
import { useHistory } from "react-router-dom";
import { dashboard as dashboardPath } from "AppRouter/paths.json";
import firebase, { auth } from "config/firebase";
import { GlobalDataContext } from "Store";
import { toast } from "react-toastify";
import { UPDATE_USER } from "Store/actionTypes";
import Spinner from "components/Spinner";

const styles = {
  formControl: {
    borderRadius: "22px",
    marginBottom: "18px",
    padding: "1.25rem 0.93rem",
  },
};

const AdminLoginScreen = () => {
  const { dispatch } = React.useContext(GlobalDataContext);
  const [sendingRequest, setSendingRequest] = React.useState(false);
  const history = useHistory();
  const [state, setState] = React.useState({
    email: "",
    password: "",
    isInvalid: {
      email: false,
      password: false,
    },
    errors: {
      email: false,
      password: false,
    },
    showIcon: {
      password: true,
    },
    passType: true, //"password",
    hitvalidated: false,
  });

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: UPDATE_USER, payload: user });
      } else {
        dispatch({ type: UPDATE_USER, payload: null });
      }
    });
  }, []);

  React.useEffect(() => {
    if (!state.hitValidated) return;
    handleErrors();
  }, [state.email, state.password]);

  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const shouldSendRequest = handleErrors();

    if (form.checkValidity() === true && shouldSendRequest) {
      //IF there are no errors, we send request
      authenticate(state.email, state.password);
    }
  };

  const authenticate = (email, password) => {
    setSendingRequest(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setSendingRequest(false);
        dispatch({ type: UPDATE_USER, payload: result.user });
        sessionStorage.setItem("isAuthenticated", true);
        history.push(dashboardPath);
      })
      .catch((error) => {
        setSendingRequest(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleErrors = () => {
    const isInvalid = {
      email: false,
      password: false,
    };
    const errors = {
      email: "",
      password: "",
    };
    if (state.password === "") {
      isInvalid.password = true;
      errors.password = "Enter Password";
    }
    if (state.email === "") {
      isInvalid.email = true;
      errors.email = "Enter email";
    } else if (!validator.isEmail(state.email)) {
      isInvalid.email = true;
      errors.email = "Enter valid email";
    }

    setState((prevState) => ({
      ...prevState,
      isInvalid,
      errors,
      hitValidated: true,
      showIcon: {
        password: !isInvalid.password,
      },
    }));
    return !isInvalid.password && !isInvalid.email;
  };
  const onChangeHandler = ({ target: { value, name } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const togglePasswordHndlr = () => {
    setState((state) => ({ ...state, passType: !state.passType }));
  };
  return (
    <div className="admin_container">
      <Card className="admin_login_container">
        <Card.Title className="admin_login_header">Sign in</Card.Title>
        <Form style={{ fontSize: "0.75rem" }}>
          <Form.Group controlId="AuthForm_email">
            <Form.Control
              type="email"
              placeholder="Email"
              style={{ ...styles.formControl, marginBottom: 0 }}
              value={state.email}
              onChange={onChangeHandler}
              name="email"
              isInvalid={state.isInvalid.email}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ fontSize: ".8rem", paddingLeft: "1rem" }}
            >
              {state.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="form_with_icon">
            <Form.Group controlId="AuthForm_password">
              <Form.Control
                type={state.passType ? "password" : "text"}
                name="password"
                placeholder="Password"
                style={{ ...styles.formControl, marginBottom: 0 }}
                value={state.password}
                onChange={onChangeHandler}
                isInvalid={state.isInvalid.password}
                autoComplete="current-password"
              />
              {state.showIcon.password && (
                <div className="icon" onClick={togglePasswordHndlr}>
                  <Image src={LockSVG} fluid height="100%" />
                </div>
              )}
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: ".8rem", paddingLeft: "1rem" }}
              >
                {state.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <button
            className="form_btn"
            onClick={submitHandler}
            style={{
              opacity: sendingRequest ? ".8" : "1",
              marginTop: "1rem",
              padding: "0.6rem 0",
            }}
            id="signIn"
          >
            {sendingRequest ? <Spinner /> : " Sign in"}
          </button>
        </Form>

        <p className="admin_login_footer">
          Tree<span>Savers </span>
          <span className="text">Admin panel</span>
        </p>
      </Card>
    </div>
  );
};

export default AdminLoginScreen;
