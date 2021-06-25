import React from 'react';
import TrendingFlatOutlinedIcon from '@material-ui/icons/TrendingFlatOutlined';

import CalendarDetail from '../components/CalendarDetail';
import CategoryItems from '../components/CategoryItems';
import '../sass/buttons.scss';
import '../sass/HistoryPage.scss';

const categories = [{name: 'Meats', items: ['Chicken', 'Egg','kalmar', 'dsaasdasdasdasd dfdfsdsd dfsdsfdsfdsfdsf', 'sadsadasd', 'dsasadsadassad', 'dsadasdasd']}];

const HistoryItemPage = () => {
    const cats = categories.map((cat) =>
    <div className="items__category" key={cat.name}>
      <h4 className="subheading subheading--items">{cat.name}</h4>
      <CategoryItems items={cat.items} add={false} />
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