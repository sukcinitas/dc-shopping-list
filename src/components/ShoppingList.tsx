import React, { useState } from 'react';

import '../sass/ShoppingList.scss';
import '../sass/buttons.scss';
import '../sass/inputs.scss';
import '../sass/headings.scss';
import image from '../assets/source.svg';
import AddItemCard from './AddItemCard';

const ShoppingList = () => {
  const info = [{name: 'name', items: ['game', 'play', 'fun', 'sad', 'keel', 'seel']}];
  const list = info.map((item) => (
    <div key={item.name} className="shopping-list__category">
      <h4 className="shopping-list__tag">{item.name}</h4>
      <ul>
        {item.items.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  ));
  const [isAdding, setIsAdding] = useState(false);
  const shoppingList = <form className="shopping-list">
    <div className="shopping-list__main">
      <div className="shopping-list__add-item">
        <img className="shopping-list__img" src={image} />
        <div className="shopping-list__qs">
          <p>Did not find what you need?</p>
          <button onClick={() => setIsAdding(true)} className="btn btn--narrow">Add item</button>
        </div>
      </div>
      <h2 className="subheading">Shopping List</h2>
    </div>
    {list}
    <div className="inpts">
          <input className="inpt inpt--bright" placeholder="Enter a name" />
          <button className="btn btn--bright-input">Save</button>
    </div>
  </form>;
  return isAdding ? <AddItemCard cb={() => setIsAdding(false)} /> : shoppingList;
};

export default ShoppingList;