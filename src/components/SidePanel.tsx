import React from 'react';
import { useSelector } from 'react-redux';

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

  return (
  <div className={shown ? 'side-panel' : 'side-panel side-panel--hidden'}>
      <ShoppingList />
      { item && <ItemInfoCard /> }
  </div>
)
};

export default SidePanel;