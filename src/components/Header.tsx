import React from 'react';
import { NavLink as Link } from "react-router-dom";
import ReplayIcon from '@material-ui/icons/Replay';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import image from '../assets/logo.svg';
import Tooltip from './TooltipDetail';
import '../sass/Header.scss';

const Header = () => {
  return (
  <header className="header">
    <img 
      className="header__logo icon header__item" 
      src={image} 
      alt="logo">
    </img>
    <nav className="nav">
        <ul className="nav__list">
          <li className="nav__link header__item">
            <Link to="/" className="icon" activeClassName="icon--selected" exact={true}>
              <FormatListBulletedOutlinedIcon fontSize="default" />
              <Tooltip>items</Tooltip>
            </Link>
          </li>
          <li className="nav__link header__item">
              <Link to="/history" className="icon" activeClassName="icon--selected" >
                <ReplayIcon fontSize="default"/>
                <Tooltip>history</Tooltip>
              </Link>
          </li>
          <li className="nav__link header__item">
              <Link to="/statistics" className="icon" activeClassName="icon--selected" >
                <AssessmentOutlinedIcon fontSize="default"/>
                <Tooltip>statistics</Tooltip>
              </Link>
          </li>
        </ul>
    </nav>
    <ShoppingCartOutlinedIcon className="icon icon--with-bg header__item" />
  </header>
)
};

export default Header;