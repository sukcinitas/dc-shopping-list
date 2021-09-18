import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../sass/ShoppingList.scss';
import '../sass/buttons.scss';
import '../sass/inputs.scss';
import '../sass/headings.scss';
import ConfirmationBox from './ConfirmationBox';
import image from '../assets/source.svg';
import AddItemCard from './AddItemCard';
import PiecesDetail from './PiecesDetail';
import EditIcon from '@material-ui/icons/Edit';
import Loader from './Loader';
import {
  changeActiveListState, selectStatus, removeItem, selectItemsByCategories, selectListName, increaseAmount, decreaseAmount, saveList, selectInEditState, editState, toggleItemCompletion
} from '../store/reducers/listSlice';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const initialList = useSelector(selectItemsByCategories);
  const title = useSelector(selectListName);
  const isInEdit = useSelector(selectInEditState);
  const status = useSelector(selectStatus);
  const list = [];
  const [name, setName] = useState(title);
  const [isCancelling, setIsCancelling] = useState(false);

  for (const category of Object.keys(initialList)) {
    list.push(
    <div key={category} className="shopping-list__category">
      <h4 className="subheading subheading--list">{category}</h4>
      <ul>
        {initialList[category].map((product: { id: number|undefined; product_id: number; name: string; pieces: number; category: string; completed: boolean }) => {
        return <li className="shopping-list__item" key={product.product_id}>
          {product.completed ? <span className="shopping-list__tag">{!isInEdit && <CheckBoxOutlinedIcon onClick={() => dispatch(toggleItemCompletion({id: product.id, completed: false}))} className="shopping-list__icon" />}<span className={isInEdit ? '' : 'linethrough'}>{product.name}</span></span> 
          : <span className={isInEdit ? "shopping-list__tag shopping-list__tag--edit" : "shopping-list__tag"}>{!isInEdit && <CheckBoxOutlineBlankOutlinedIcon onClick={() => dispatch(toggleItemCompletion({id: product.id, completed: true}))} className="shopping-list__icon" />}<span>{product.name}</span></span>}
          <PiecesDetail 
            deleteItem={() => deleteItem(product.product_id)} 
            pcs={product.pieces} 
            increaseAmount={() => dispatch(increaseAmount({id: product.product_id }))}
            decreaseAmount={() => dispatch(decreaseAmount({id: product.product_id }))}
          />
        </li>})}
      </ul>
    </div>
    )
  }
  const [isAdding, setIsAdding] = useState(false);

  const deleteItem = (id:number) => {
    dispatch(removeItem({ id }));
  }

  const save = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(saveList(name));
    setName(name);
  }

  const changeListState = (e: React.MouseEvent<HTMLElement>, state: 'completed'|'cancelled') => {
    e.preventDefault();
    dispatch(changeActiveListState(state));
    setName('');
  }

  const shoppingList = <form className="shopping-list">
    {isCancelling && <ConfirmationBox cb={(e: React.MouseEvent<HTMLElement>) => { changeListState(e, 'cancelled'); setIsCancelling(false)}} close={() => setIsCancelling(false)} />}
    {isInEdit ? 
    <div className="inpts">
        <input className={title ? 'inpt inpt--bright' : 'inpt inpt--grey'} placeholder="Enter a name" value={name} onChange={(e) => setName(e.target.value)} />
        <button className={title ? 'btn btn--bright-input' : 'btn btn--grey-input'} type="submit" disabled={!name} onClick={(e) => save(e)}>Save</button>
    </div>
    :
    <div className="btns">
        <button type="button" className="btn" onClick={() => setIsCancelling(true)}>cancel</button>
        <button disabled={list.length === 0} className={list.length > 0 ? 'btn btn--blue' : 'btn btn--blue-lighter'} type="button" onClick={(e) => changeListState(e, 'completed')}>Complete</button>
    </div>
    }
    <div className="shopping-list__add-item">
        <div className="shopping-list__qs">
          <img className="shopping-list__img" src={image} />
          <p>Did not find what you need?</p>
          <button onClick={() => setIsAdding(true)} className="btn btn--narrow">Add item</button>
        </div>
    </div>
    { status === 'loading' ? <Loader style="dots" /> : <div className={Object.keys(initialList).length === 0 ? 'shopping-list__main shopping-list__main--no-items' : 'shopping-list__main'}>
      {title && <h2 className="subheading subheading--title">{title}{isInEdit ? '' : <EditIcon onClick={() => dispatch(editState({ state: 'edit' }))} className="subheading__icon" /> }</h2>}
      {Object.keys(initialList).length === 0 ? <><p className="subheading subheading--no-items">No items</p></> : list}
    </div> }
  </form>;
  return isAdding ? <AddItemCard cb={() => setIsAdding(false)} /> : shoppingList;
};

export default ShoppingList;