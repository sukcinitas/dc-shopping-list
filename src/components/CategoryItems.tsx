import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import {
  selectItem,
} from '../store/reducers/itemsSlice';
import {
  useRouteMatch, useHistory
} from "react-router-dom";


import PiecesDetail from './PiecesDetail'
import '../sass/ItemsPage.scss';
import '../sass/PiecesDetail.scss';

const CategoryItems = ({items, category, add }: {items: Array<{ id: string; name: string; url: string; description: string; }>;  category: string; add: boolean; }) => {
  const dispatch = useDispatch();
  const select = (item:any, category:string) => {
    dispatch(selectItem({item, category}));
  };
  return (
    <div className="items__items">
    {items.map((item) => 
      <div className="items__item" key={item.id} onClick={() => select(item, category)}>
        {item.name}
        {add ? <AddIcon className="items__icon" /> : <PiecesDetail pcs={4} simple />}
      </div>
    )}
  </div>
)
};

export default CategoryItems;