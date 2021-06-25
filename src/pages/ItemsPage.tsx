import React from 'react';

import '../sass/ItemsPage.scss';
import '../sass/headings.scss';
import SearchBar from '../components/SearchBar';
import CategoryItems from '../components/CategoryItems';

const categories = [{name: 'Meats', items: ['Chicken', 'Egg','kalmar', 'dsaasdasdasdasd dfdfsdsd dfsdsfdsfdsfdsf', 'sadsadasd', 'dsasadsadassad', 'dsadasdasd']}];

const ItemsPage = () => {
  const cats = categories.map((cat) =>
    <div className="items__category" key={cat.name}>
      <h4 className="subheading subheading--items">{cat.name}</h4>
      <CategoryItems items={cat.items} add />
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