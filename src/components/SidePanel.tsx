import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getActiveList,
} from '../store/reducers/listSlice';
import {
  selectAddError, changeAddErrorMessage,
  selectAddMessage, changeAddMessage
} from '../store/reducers/productsSlice';
import Message from './Message';
import {
  selectSelectedItem,
  selectIsSidePanelShown
} from '../store/reducers/productsSlice';
import ItemInfoCard from './ItemInfoCard';
import ShoppingList from './ShoppingList';
import '../sass/SidePanel.scss';

const SidePanel = () => {
  const item = useSelector(selectSelectedItem);
  const shown = useSelector(selectIsSidePanelShown);
  const error = useSelector(selectAddError);
  const message = useSelector(selectAddMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveList());
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      const timer = setInterval(() => {
      dispatch(changeAddErrorMessage());
      }, 2000)
      return () => clearInterval(timer);
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (message) {
      const timer = setInterval(() => {
      dispatch(changeAddMessage());
      }, 2000)
      return () => clearInterval(timer);
    }
  }, [dispatch, message]);

  return (
  <div className={shown ? 'side-panel' : 'side-panel side-panel--hidden'}>
      {error && <Message error fullWidth>{error}</Message>}
      {message && <Message success fullWidth>{message}</Message>}
      <ShoppingList />
      { item && <ItemInfoCard /> }
  </div>
)
};

export default SidePanel;