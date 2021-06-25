import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import PiecesDetail from './PiecesDetail'
import '../sass/ItemsPage.scss';
import '../sass/PiecesDetail.scss';

const CategoryItems = ({items, add }: {items: Array<string>; add: boolean; }) => {
  return (
    <div className="items__items">
    {items.map((item) => 
      <div className="items__item" key={item}>
        {item}
        {add ? <AddIcon className="items__icon" /> : <PiecesDetail pcs={4} simple />}
      </div>
    )}
  </div>
)
};

export default CategoryItems;