import React from 'react';
import TrendingFlatOutlinedIcon from '@material-ui/icons/TrendingFlatOutlined';

import { useSelector } from 'react-redux';
import CalendarDetail from '../components/CalendarDetail';
import CategoryItems from '../components/CategoryItems';
import '../sass/buttons.scss';
import '../sass/HistoryPage.scss';

const HistoryItemPage = () => {
  const categories = useSelector((state:any) => state.items.categoriesNames);

    const cats = categories.map((cat: {category: string; items: [{ id: string; name: string; url: string; description: string; }]}) =>
    <div className="items__category" key={cat.category}>
      <h4 className="subheading subheading--items">{cat.category}</h4>
      <CategoryItems items={cat.items} add={false} category={cat.category} />
    </div>
  )
    return (
        <div className="history">
          <button className="btn btn--bright-text"><TrendingFlatOutlinedIcon className="arrow" />back</button>
          <div className="history__header">
            <h1 className="heading">Some kind of name</h1>
            <CalendarDetail date="Tue 2013-14-15" />
          </div>
          <div className="history__items">
              {cats}
          </div>
        </div>
      )
}

export default HistoryItemPage;