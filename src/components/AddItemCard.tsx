import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {
  add,
  // selectCategoriesNames
} from '../store/reducers/itemsSlice';
import '../sass/AddItemCard.scss';
import '../sass/buttons.scss';
import '../sass/inputs.scss';

const AddItemCard = () => {
  const categories = useSelector((state:any) => state.items.categoriesNames);
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const categoryList = categories.map((category: string) => <li onClick={(e) => setCategory('game')} className="add-item-card__list-item" key={category}>{category}</li>);

  return (
  <form className="add-item-card">
      <div className="add-item-card__main">
        <h2 className="heading">Add a new item</h2>
        <div>
          <label htmlFor="name" className="add-item-card__tag">Name</label>
          <input id="name" placeholder="Enter a name" className="inpt" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="add-item-card__elem">
            <label htmlFor="description" className="add-item-card__tag">Note (optional)</label>
            <textarea id="description" placeholder="Enter a note" className="inpt" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="add-item-card__elem">
            <label htmlFor="image" className="add-item-card__tag">Image (optional)</label>
            <input id="image" placeholder="Enter a url" className="inpt" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className="add-item-card__elem">
            <label htmlFor="category" className="add-item-card__tag">Category</label>
            <input id="category" placeholder="Enter a category" className="inpt inpt--select" value={category} onChange={(e) => setCategory(e.target.value)} />
            <ul className="add-item-card__list">
                {categoryList}
            </ul>
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