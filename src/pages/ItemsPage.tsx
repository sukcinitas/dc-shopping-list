import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectProductsByCategories, getProducts, selectState, selectError, changeAddErrorMessage, selectAddError
} from '../store/reducers/productsSlice';
import { selectItemPiecesMessage, changeItemPiecesMessage } from '../store/reducers/listSlice';
import '../sass/ItemsPage.scss';
import '../sass/headings.scss';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CategoryItems from '../components/CategoryItems';

const ItemsPage = () => {
  const categories = useSelector(selectProductsByCategories);
  const state = useSelector(selectState);
  const error = useSelector(selectError);
  const addError = useSelector(selectAddError);
  const itemPiecesMessage = useSelector(selectItemPiecesMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (addError) {
      const timer = setInterval(() => {
      dispatch(changeAddErrorMessage());
      }, 1500)
      return () => clearInterval(timer);
    }
  }, [dispatch, addError]);

  useEffect(() => {
    if (itemPiecesMessage) {
      const timer = setInterval(() => {
        dispatch(changeItemPiecesMessage());
      }, 2000)
      return () => clearInterval(timer);
    }
  }, [dispatch, itemPiecesMessage]);

  const cats = categories.map((cat) =>
    <div className="items__category" key={cat.category}>
      <h4 className="subheading subheading--items">{cat.category}</h4>
      <CategoryItems items={cat.items} add ac={cat.accumLength} />
    </div>
  );

  return (
  <div className="items">
    {error && <Message error>{error}</Message>}
    {itemPiecesMessage && <Message success>{itemPiecesMessage}</Message>}
    <div className="items__header">
      <h1 className="heading"><span className="heading__detail">Shoppingify</span> allows you take your shopping list wherever you go</h1>
      <SearchBar />
    </div>
    {state === 'loading' ? <Loader />:<>
    <div className="items__categories">
      {cats}
    </div></>}
  </div>
)
};

export default ItemsPage;