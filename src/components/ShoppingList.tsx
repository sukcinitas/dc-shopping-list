import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../sass/ShoppingList.scss';
import '../sass/buttons.scss';
import '../sass/inputs.scss';
import '../sass/headings.scss';
import image from '../assets/source.svg';
import AddItemCard from './AddItemCard';
import PiecesDetail from './PiecesDetail';

const ShoppingList = () => {
  const initialList = useSelector((state:any) => state.list.categories);
  console.log(initialList);
  const title = useSelector((state:any) => state.list.name);
  console.log(title);
  const list = initialList.map((item: { category: string, items: [{ id: string; name: string; pieces: number; }]}) => (
    <div key={item.category} className="shopping-list__category">
      <h4 className="subheading subheading--list">{item.category}</h4>
      <ul>
        {item.items.map((product: { id: string; name: string; pieces: number; }) => <li className="shopping-list__item" key={product.id}><span>{product.name}</span><PiecesDetail pcs={product.pieces} /></li>)}
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
      <h2 className="subheading">{title}</h2>
      {list}
    </div>
    <div className="inpts">
          <input className="inpt inpt--bright" placeholder="Enter a name" />
          <button className="btn btn--bright-input">Save</button>
    </div>
  </form>;
  return isAdding ? <AddItemCard cb={() => setIsAdding(false)} /> : shoppingList;
};

export default ShoppingList;