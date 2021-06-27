import React from 'react';
import { useSelector } from 'react-redux';

import '../sass/ItemsPage.scss';
import '../sass/headings.scss';
import SearchBar from '../components/SearchBar';
import CategoryItems from '../components/CategoryItems';

const ItemsPage = () => {
  const categories = useSelector((state:any) => state.items.categories);

  const cats = categories.map((cat: {category: string; items: [{ id: string; name: string; url: string; description: string; }]}) =>
    <div className="items__category" key={cat.category}>
      <h4 className="subheading subheading--items">{cat.category}</h4>
      <CategoryItems items={cat.items} category={cat.category} add />
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