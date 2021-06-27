import React from 'react';
import { useSelector } from 'react-redux';

import ItemInfoCard from './ItemInfoCard';
import ShoppingList from './ShoppingList';
import '../sass/SidePanel.scss';

const SidePanel = () => {
  const item = useSelector((state:any) => state.items.selectedItem);
  console.log(item);
  return (
  <div className="side-panel">
      <ShoppingList />
      { item && <ItemInfoCard /> }
  </div>
)
};

export default SidePanel;