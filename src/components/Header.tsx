import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import ReplayIcon from '@material-ui/icons/Replay';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidePanel } from '../store/reducers/productsSlice';
import { selectNonCompletedAmount } from '../store/reducers/listSlice';

import image from '../assets/logo.svg';
import Tooltip from './TooltipDetail';
import '../sass/Header.scss';

const Header = () => {
  const nonCompleted = useSelector(selectNonCompletedAmount);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <img
        className="header__logo icon header__item"
        src={image}
        alt="logo"
      ></img>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__link header__item">
            <Link
              to="/"
              className="icon"
              activeClassName="icon--selected"
              exact={true}
            >
              <FormatListBulletedOutlinedIcon fontSize="medium" />
              <Tooltip>items</Tooltip>
            </Link>
          </li>
          <li className="nav__link header__item">
            <Link
              to="/history"
              className="icon"
              activeClassName="icon--selected"
            >
              <ReplayIcon fontSize="medium" />
              <Tooltip>history</Tooltip>
            </Link>
          </li>
          <li className="nav__link header__item">
            <Link
              to="/statistics"
              className="icon"
              activeClassName="icon--selected"
            >
              <AssessmentOutlinedIcon fontSize="medium" />
              <Tooltip>statistics</Tooltip>
            </Link>
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
