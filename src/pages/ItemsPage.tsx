import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectProductsByCategories, getProducts, selectState
} from '../store/reducers/productsSlice';
import {
  getActiveList
} from '../store/reducers/listSlice';
import '../sass/ItemsPage.scss';
import '../sass/headings.scss';
import SearchBar from '../components/SearchBar';
import CategoryItems from '../components/CategoryItems';

const ItemsPage = () => {
  const categories = useSelector(selectProductsByCategories);
  const state = useSelector(selectState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const cats = Object.keys(categories).map((cat) =>
    <div className="items__category" key={cat}>
      <h4 className="subheading subheading--items">{cat}</h4>
      <CategoryItems items={categories[cat]} add />
    </div>
  );

  if (state === 'loading') {
    return <h1>Loading...</h1>
  }
  return (
  <div className="items">
    <div className="items__header">
      <h1 className="heading"><span className="heading__detail">Shoppingify</span> allows you take your shopping list wherever you go</h1>
      <SearchBar />
    </div>
    <div className="items__categories">
      {cats}
    </div>
  </div>
)
};

export default ItemsPage;