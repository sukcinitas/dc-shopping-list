import React from 'react';

import ItemInfoCard from './ItemInfoCard';
import AddItemCard from './AddItemCard';
import ShoppingList from './ShoppingList';
import '../sass/SidePanel.scss';

const item = {
    name: 'name',
    category: 'cat',
    description: 'dasasdsadsd sdsadsd dsasda sda dsaasd sad sadsda',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
}

const SidePanel = () => {
  return (
  <div className="side-panel">
      {/* <ItemInfoCard item={item} /> */}
      {/* <AddItemCard /> */}
      <ShoppingList />
  </div>
)
};

export default SidePanel;