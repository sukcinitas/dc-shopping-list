import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import {
  selectProduct,
} from '../store/reducers/productsSlice';
import {
  addItem
} from '../store/reducers/listSlice';
import '../sass/ItemsPage.scss';
import '../sass/PiecesDetail.scss';
import PiecesDetail from './PiecesDetail';

interface Item {
  product_id?: number; name: string; url: string; description: string; pieces?: number, id?: number|undefined;
}

const CategoryItems = ({items, add }: {items: Array<Item>, add?: boolean}) => {
  const dispatch = useDispatch();
  const select = (item: Item) => {
    if (!add) return;
    dispatch(selectProduct({ item }));
  };
  const addItemToList = (e: React.MouseEvent<SVGElement>, item: Item) => {
    e.stopPropagation();
    if (!add) return;
    dispatch(addItem({ item }));
  }
  return (
    <div className="items__items">
    {items.map((item) => 
      <div className={add ? 'items__item' : 'items__item items__item--history'} key={item.id} onClick={() => select(item)}>
        {item.name}
        {add ? <AddIcon className="items__icon" onClick={(e) => addItemToList(e, item)} /> : <PiecesDetail pcs={item.pieces} simple />}
      </div>
    )}
  </div>
)
};

export default CategoryItems;