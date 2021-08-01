import React, { useEffect } from 'react';
import TrendingFlatOutlinedIcon from '@material-ui/icons/TrendingFlatOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  selectItemsByCategories, selectListName, selectListDate, getList
} from '../store/reducers/historyListSlice';
import CategoryItems from '../components/CategoryItems';
import CalendarDetail from '../components/CalendarDetail';
import '../sass/buttons.scss';
import '../sass/HistoryPage.scss';

const HistoryListPage = () => {
  const items = useSelector(selectItemsByCategories);
  const name = useSelector(selectListName);
  const date = useSelector(selectListDate);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getList(Number(id)));
  }, [dispatch, id])

  const cats = Object.keys(items).map((cat) =>
  <div className="items__category" key={cat}>
    <h4 className="subheading subheading--items">{cat}</h4>
    <CategoryItems items={items[cat]} add={false} />
  </div>
  );

  return (
      <div className="history">
        <button className="btn btn--bright-text" onClick={() => history.go(-1)}><TrendingFlatOutlinedIcon className="arrow" />back</button>
        <div className="history__header">
          <h1 className="heading">{name}</h1>
          <CalendarDetail date={date} />
        </div>
        <div className="history__items">
            {cats}
        </div>
      </div>
    )
}

export default HistoryListPage;