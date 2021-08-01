import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getActiveList
} from '../store/reducers/listSlice';
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveList());
  }, [dispatch]);

  return (
  <div className={shown ? 'side-panel' : 'side-panel side-panel--hidden'}>
      <ShoppingList />
      { item && <ItemInfoCard /> }
  </div>
)
};

export default SidePanel;