import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector  } from 'react-redux';
import {
  selectProduct,
} from '../store/reducers/productsSlice';
import {
  selectInEditState, addItem
} from '../store/reducers/listSlice';
import '../sass/ItemsPage.scss';
import '../sass/PiecesDetail.scss';
import PiecesDetail from './PiecesDetail';

const CategoryItems = ({items, category, add }: {items: Array<{ id: string; name: string; url: string; description: string; }>;  category: string; add: boolean; }) => {
  const dispatch = useDispatch();
  const select = (item:any, category:string) => {
    dispatch(selectProduct({item, category}));
  };
  const addItemToList = (e: any, item: any) => {
    e.stopPropagation();
    dispatch(addItem({item}));
  }
  const isInEdit = useSelector(selectInEditState);
  return (
    <div className="items__items">
    {items.map((item) => 
      <div className="items__item" key={item.id} onClick={() => select(item, category)}>
        {item.name}
        {add ? <AddIcon className="items__icon" onClick={(e) => addItemToList(e, {id: item.id, name: item.name, category })} /> : <PiecesDetail pcs={4} simple />}
      </div>
    )}
  </div>
)
};

export default CategoryItems;