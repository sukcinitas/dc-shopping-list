import React from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/MeetingRoomOutlined";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidePanel } from "../store/reducers/productsSlice";
import { selectNonCompletedAmount } from "../store/reducers/listSlice";

import image from "../assets/logo.svg";
import Tooltip from "./TooltipDetail";
import "../sass/Header.scss";
import axios from "axios";
import { logoutCurrentUser } from "../store/reducers/userSlice";
import { AppDispatch } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const nonCompleted = useSelector(selectNonCompletedAmount);
  const dispatch = useDispatch<AppDispatch>();

  const logout = async function () {
    axios.get("/api/users/logout").then(() => {
      dispatch(logoutCurrentUser());
      navigate("/");
    });
  };

  return (
    <header className="header">
      <img className="header__logo icon header__item" src={image} alt="logo" />
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__link header__item">
            <Link
              to="/"
              className={({ isActive }) =>
                `icon ${isActive ? "icon--selected" : ""}`
              }
            >
              <FormatListBulletedOutlinedIcon fontSize="medium" />
              <Tooltip>items</Tooltip>
            </Link>
          </li>
          <li className="nav__link header__item">
            <Link
              to="/history"
              className={({ isActive }) =>
                `icon ${isActive ? "icon--selected" : ""}`
              }
            >
              <ReplayIcon fontSize="medium" />
              <Tooltip>history</Tooltip>
            </Link>
          </li>
          <li className="nav__link header__item">
            <Link
              to="/statistics"
              className={({ isActive }) =>
                `icon ${isActive ? "icon--selected" : ""}`
              }
            >
              <AssessmentOutlinedIcon fontSize="medium" />
              <Tooltip>statistics</Tooltip>
            </Link>
          </li>
          <li className="nav__link header__item">
            <button className="icon" onClick={logout}>
              <LogoutIcon fontSize="medium"></LogoutIcon>
              <Tooltip>logout</Tooltip>
            </button>
          </li>
        </ul>
      </nav>
      <span className="icon-wrapper">
        <ShoppingCartOutlinedIcon
          onClick={() => dispatch(toggleSidePanel())}
          className="icon icon--with-bg header__item"
        />
        {nonCompleted !== 0 && (
          <span className="non-completed">{nonCompleted}</span>
        )}
      </span>
    </header>
  );
};

export default Header;
