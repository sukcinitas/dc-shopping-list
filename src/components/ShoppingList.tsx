import React from 'react';

import '../sass/ShoppingList.scss';
import '../sass/buttons.scss';
import '../sass/inputs.scss';
import '../sass/headings.scss';
import image from '../assets/source.svg';

const ShoppingList = () => {
  // const list = info.map((item) => (
  //   <div className="shopping-list__category">
  //     <h4 className="shopping-list__tag">Name</h4>
  //     <ul>
  //     </ul>
  //   </div>
  // ))
  return (
  <form className="shopping-list">
      <div className="shopping-list__main">
        <div className="shopping-list__add-item">
          <img className="shopping-list__img" src={image} />
          <div className="shopping-list__qs">
            <p>Did not find what you need?</p>
            <button className="btn btn--narrow">Add item</button>
          </div>
        </div>
        <h2 className="subheading">Shopping List</h2>
      </div>
      <div className="inpts">
            <input className="inpt inpt--bright" placeholder="Enter a name" />
            <button className="btn btn--bright-input">Save</button>
      </div>
  </form>
)
};

export default ShoppingList;