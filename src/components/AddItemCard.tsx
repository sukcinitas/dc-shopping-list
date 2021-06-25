import React from 'react';

import '../sass/AddItemCard.scss';
import '../sass/buttons.scss';
import '../sass/inputs.scss';

const AddItemCard = () => {
  return (
  <form className="add-item-card">
      <div className="add-item-card__main">
        <h2 className="heading">Add a new item</h2>
        <div>
          <label htmlFor="name" className="add-item-card__tag">Name</label>
          <input id="name" placeholder="Enter a name" className="inpt" />
        </div>
        <div className="add-item-card__elem">
            <label htmlFor="description" className="add-item-card__tag">Note (optional)</label>
            <textarea id="description" placeholder="Enter a note" className="inpt" />
        </div>
        <div className="add-item-card__elem">
            <label htmlFor="image" className="add-item-card__tag">Image (optional)</label>
            <input id="image" placeholder="Enter a url" className="inpt" />
        </div>
        <div className="add-item-card__elem">
            <label htmlFor="category" className="add-item-card__tag">Category</label>
            <input id="category" placeholder="Enter a category" className="inpt" />
        </div>
      </div>
      <div className="btns btns--grey">
          <button className="btn">Cancel</button>
          <button className="btn btn--bright">Save</button>
      </div>
  </form>
)
};

export default AddItemCard;