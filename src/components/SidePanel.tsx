import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getActiveList,
} from '../store/reducers/listSlice';
import {
  selectAddError, changeErrorMessage
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveList());
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      setInterval(() => {
      dispatch(changeErrorMessage());
      }, 500)

    }
  }, [dispatch, error]);

console.log(error)

  return (
  <div className={shown ? 'side-panel' : 'side-panel side-panel--hidden'}>
      {error && <Message error fullWidth>{error}</Message>}
      <ShoppingList />
      { item && <ItemInfoCard /> }
  </div>
)
};

export default SidePanel;