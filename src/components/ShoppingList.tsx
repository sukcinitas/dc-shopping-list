import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../sass/ShoppingList.scss';
import '../sass/buttons.scss';
import '../sass/inputs.scss';
import '../sass/headings.scss';
import ConfirmationBox from './ConfirmationBox';
import image from '../assets/source.svg';
import image2 from '../assets/cart.svg';
import AddItemCard from './AddItemCard';
import PiecesDetail from './PiecesDetail';
import EditIcon from '@material-ui/icons/Edit';
import {
  removeItem, selectItemsByCategories, selectListName, increaseAmount, decreaseAmount, editName, selectInEditState, editState, cancelList, toggleItemCompletion
} from '../store/reducers/listSlice';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const initialList = useSelector(selectItemsByCategories);
  const title = useSelector(selectListName);
  const isInEdit = useSelector(selectInEditState);
  const list = [];
  const [name, setName] = useState(title);
  const [isCancelling, setIsCancelling] = useState(false);

  for (const category of Object.keys(initialList)) {
    list.push(
    <div key={category} className="shopping-list__category">
      <h4 className="subheading subheading--list">{category}</h4>
      <ul>
        {initialList[category].map((product: { id: string; name: string; pieces: number; category: string; completed: boolean }) => {
        return <li className="shopping-list__item" key={product.id}>
          {product.completed ? <span className="shopping-list__tag">{!isInEdit && <CheckBoxOutlinedIcon onClick={() => dispatch(toggleItemCompletion({id: product.id}))} className="shopping-list__icon" />}<span className="linethrough">{product.name}</span></span> 
          : <span className="shopping-list__tag">{!isInEdit && <CheckBoxOutlineBlankOutlinedIcon onClick={() => dispatch(toggleItemCompletion({id: product.id}))} className="shopping-list__icon" />}<span>{product.name}</span></span>}
          <PiecesDetail 
            deleteItem={() => deleteItem(product.id)} 
            pcs={product.pieces} 
            increaseAmount={() => dispatch(increaseAmount({id: product.id }))}
            decreaseAmount={() => dispatch(decreaseAmount({id: product.id }))}
          />
        </li>})}
      </ul>
    </div>
    )
  }
  const [isAdding, setIsAdding] = useState(false);

  const deleteItem = (id:string) => {
    dispatch(removeItem({ id }));
  }

  const changeName = (e: any) => {
    e.preventDefault();
    dispatch(editName({ name }));
    setName(name);
  }

  const shoppingList = <form className="shopping-list">
    {isCancelling && <ConfirmationBox cb={() => { dispatch(cancelList()); setIsCancelling(false)}} close={() => setIsCancelling(false)} />}
    {isInEdit ? 
    <div className="inpts">
        <input className={title ? 'inpt inpt--bright' : 'inpt inpt--grey'} placeholder="Enter a name" value={name} onChange={(e) => setName(e.target.value)} />
        <button className={title ? 'btn btn--bright-input' : 'btn btn--grey-input'} type="submit" disabled={!name} onClick={(e) => changeName(e)}>Save</button>
    </div>
    :
    <div className="inpts">
        <button type="button" className="btn" onClick={() => setIsCancelling(true)}>cancel</button>
        <button className="btn btn--blue" type="submit">Complete</button>
    </div>
    }
    <div className={Object.keys(initialList).length === 0 ? 'shopping-list__main shopping-list__main--no-items' : 'shopping-list__main'}>
      <div className="shopping-list__add-item">
        <img className="shopping-list__img" src={image} />
        <div className="shopping-list__qs">
          <p>Did not find what you need?</p>
          <button onClick={() => setIsAdding(true)} className="btn btn--narrow">Add item</button>
        </div>
      </div>
      {title && <h2 className="subheading">{title}{isInEdit ? '' : <EditIcon onClick={() => dispatch(editState({ state: 'edit' }))} className="subheading__icon" /> }</h2>}
      {Object.keys(initialList).length === 0 ? <><p className="subheading subheading--no-items">No items</p><img className="shopping-list__img--low" src={image2} /></> : list}
    </div>
  </form>;
  return isAdding ? <AddItemCard cb={() => setIsAdding(false)} /> : shoppingList;
};

export default ShoppingList;