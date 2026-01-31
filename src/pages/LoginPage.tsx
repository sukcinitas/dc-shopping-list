import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCurrentUser } from "../store/reducers/userSlice";
import { AppDispatch } from "../store";

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setErrorMessage("");
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement>,
    username: string,
    password: string,
  ): void => {
    e.preventDefault();
    axios.post("/api/users/login", { username, password }).then(
      (res) => {
        dispatch(setCurrentUser(res.data));
        navigate("/");
      },
      (err) => {
        if (err.statusCode === 401) {
          setErrorMessage(err.response.data.message);
        }
        setErrorMessage(
          err.response.data.message ||
            `${err.response.status}: ${err.response.statusText}`,
        );
      },
    );
  };

  const loginAsDefaultUser = (e: React.MouseEvent<HTMLButtonElement>): void => {
    handleSubmit(e, "user", "userPassword");
  };

  return (
    <div className="add-item-card-wrapper">
      <form className="add-item-card add-item-card--center">
        <div className="add-item-card__main" style={{ height: "unset" }}>
          <h2 className="heading">Login</h2>
          <label htmlFor="username" className="add-item-card__tag">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            className="inpt"
            autoComplete="username"
          />

          <span className="form__notes"> </span>

          <label htmlFor="password" className="add-item-card__tag">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="inpt"
            autoComplete="current-password"
          />

          <button
            data-testid="login-btn"
            type="button"
            onClick={(e) => handleSubmit(e, username, password)}
            className="btn btn--bright"
            disabled={!username || !password}
          >
            Login
          </button>

          <ul>
            <li key={errorMessage} className="add-item-card__tag error">
              {errorMessage}
            </li>
          </ul>

          <span className="add-item-card__tag">
            Do not have an account?{" "}
            <Link to="/register" className="add-item-card__tag">
              Register
            </Link>
          </span>

          <div className="form__alt-box">
            <button
              className="btn btn--blue"
              type="button"
              onClick={loginAsDefaultUser}
            >
              Login as default user
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
