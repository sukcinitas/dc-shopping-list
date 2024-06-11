import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import validity from "../util/checkValidity";

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    if (name === "username") {
      setUsername(value);
      setErrorMessages((prevState) => ({ ...prevState, username: "" }));
    } else if (name === "password") {
      setPassword(value);
      setErrorMessages((prevState) => ({ ...prevState, password: "" }));
    } else if (name === "repeatPassword") {
      setRepeatPassword(value);
      setErrorMessages((prevState) => ({ ...prevState, repeatPassword: "" }));
    }
    setErrorMessages((prevState) => ({ ...prevState, general: "" }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    // Error handling
    const newErrorMessages = {
      ...errorMessages,
      username: validity.checkUsername(username),
      password: validity.checkPassword(password),
      repeatPassword:
        password !== repeatPassword ? "Passwords must match!" : "",
    };
    setErrorMessages({
      ...newErrorMessages,
    });

    if (Object.values(newErrorMessages).some((message) => Boolean(message))) {
      return;
    }

    axios.post("/api/users/register", { username, password }).then(
      () => {
        navigate("/login");
      },
      (err) => {
        if (err.statusCode === 401) {
          setErrorMessages((prevState) => ({
            ...prevState,
            general: err.response.data.message,
          }));
        }
        setErrorMessages((prevState) => ({
          ...prevState,
          general:
            err.response.data.message ||
            `${err.response.status}: ${err.response.statusText}`,
        }));
      }
    );
  };

  return (
    <div className="add-item-card-wrapper">
      <form className="add-item-card add-item-card--center">
        <div className="add-item-card__main" style={{ height: "unset" }}>
          <h2 className="heading">Register</h2>
          <label htmlFor="username" className="add-item-card__tag">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            className={`inpt ${errorMessages.username ? "inpt--error" : ""}`}
            autoComplete="off"
          />

          <label htmlFor="password" className="add-item-card__tag">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className={`inpt ${errorMessages.password ? "inpt--error" : ""}`}
            autoComplete="off"
          />

          <label htmlFor="repeatPassword" className="add-item-card__tag">
            Repeat password
          </label>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            onChange={handleChange}
            className={`inpt ${
              errorMessages.repeatPassword ? "inpt--error" : ""
            }`}
            autoComplete="off"
          />

          <button
            data-testid="login-btn"
            type="button"
            onClick={handleSubmit}
            className="btn btn--bright"
            disabled={!username || !password}
          >
            Register
          </button>

          <ul>
            {Array.from(new Set(Object.values(errorMessages))).map(
              (message) => (
                <li key={message} className="add-item-card__tag error">
                  {message}
                </li>
              )
            )}
          </ul>

          <span className="add-item-card__tag">
            Already have an account?{" "}
            <Link to="/login" className="add-item-card__tag">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
