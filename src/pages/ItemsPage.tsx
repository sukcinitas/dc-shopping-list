import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectProductsByCategories, getProducts, selectState
} from '../store/reducers/productsSlice';
import '../sass/ItemsPage.scss';
import '../sass/headings.scss';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import CategoryItems from '../components/CategoryItems';

const ItemsPage = () => {
  const categories = useSelector(selectProductsByCategories);
  const state = useSelector(selectState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const cats = Object.keys(categories).map((cat) =>
    <div className="items__category" key={cat}>
      <h4 className="subheading subheading--items">{cat}</h4>
      <CategoryItems items={categories[cat]} add />
    </div>
  );

  return (
  <div className="items">
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