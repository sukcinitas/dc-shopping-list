import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeProduct,
  selectProduct,
  selectSelectedItem
} from '../store/reducers/productsSlice';
import {
  addItem,
} from '../store/reducers/listSlice';
import TrendingFlatOutlinedIcon from '@material-ui/icons/TrendingFlatOutlined';

import '../sass/ItemInfoCard.scss';
import '../sass/buttons.scss';

const ItemInfoCard = () => {
  let item = useSelector(selectSelectedItem);
  if (!item) {
    item = { id: 0, name: '', category: '', description: '', url: '', deleted_at: null, user_id: 0 };
  }
  const { id, name, category, description, url } = item;

  const dispatch = useDispatch();

  const addItemToList = (category: string, id: number, name: string) => {
    dispatch(addItem({ item: { id, name, category }}));
    dispatch(selectProduct({
      item: null,
    }));
  };

  const removeItemFromList = (id: number) => {
    dispatch(removeProduct(id));
    dispatch(selectProduct({
      item: null,
    }));
  };

  return (
  <article className="item-info-card">
    <div className="item-info-card__main">
      <button className="btn btn--bright-text" onClick={() => dispatch(selectProduct({item: null}))}><TrendingFlatOutlinedIcon className="arrow"/>back</button>
        {url && <img
          className="item-info-card__img"
          src={url}
        />
        }
        <div>
          <h4 className="item-info-card__tag">name</h4>
          <p className="item-info-card__content">{name}</p>
        </div>
        <div>
            <h4 className="item-info-card__tag">category</h4>
            <p className="item-info-card__content">{category}</p>
        </div>
        {description && 
        <div>
            <h4 className="item-info-card__tag"> note</h4>
            <p className="item-info-card__content">{description}</p>
        </div>}
      </div>
      <div className="btns">
          <button className="btn" onClick={() => removeItemFromList(id)}>Delete</button>
          <button className="btn btn--bright" onClick={() => addItemToList(category, id, name)}>Add to list</button>
      </div>
  </article>
)
};

export default ItemInfoCard;