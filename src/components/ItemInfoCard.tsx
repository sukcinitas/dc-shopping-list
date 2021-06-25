import React from 'react';
import TrendingFlatOutlinedIcon from '@material-ui/icons/TrendingFlatOutlined';

import '../sass/ItemInfoCard.scss';
import '../sass/buttons.scss';

type TItemInfo = {
    item: {
        name: string;
        image: string;
        description: string;
        category: string;
    }
}

const ItemInfoCard = ({ item: { name, image, description, category }}: TItemInfo) => {
  return (
  <article className="item-info-card">
    <div className="item-info-card__main">
      <button className="btn btn--bright-text"><TrendingFlatOutlinedIcon className="arrow" />back</button>
        <img
          className="item-info-card__img"
          src={image}
        />
        <div>
          <h4 className="item-info-card__tag">name</h4>
          <p className="item-info-card__content">{name}</p>
        </div>
        <div>
            <h4 className="item-info-card__tag">category</h4>
            <p className="item-info-card__content">{category}</p>
        </div>
        <div>
            <h4 className="item-info-card__tag"> note</h4>
            <p className="item-info-card__content">{description}</p>
        </div>
    </div>
      <div className="btns">
          <button className="btn">Delete</button>
          <button className="btn btn--bright">Add to list</button>
      </div>
  </article>
)
};

export default ItemInfoCard;