import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectProductsByCategories
} from '../store/reducers/productsSlice';
import '../sass/ItemsPage.scss';
import '../sass/headings.scss';
import SearchBar from '../components/SearchBar';
import CategoryItems from '../components/CategoryItems';

const ItemsPage = () => {
  const categories = useSelector(selectProductsByCategories);

  const cats = Object.keys(categories).map((cat) =>
    <div className="items__category" key={cat}>
      <h4 className="subheading subheading--items">{cat}</h4>
      <CategoryItems items={categories[cat]} add />
    </div>
  )
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