import React, { useEffect } from "react";
import TrendingFlatOutlinedIcon from "@material-ui/icons/TrendingFlatOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  selectItemsByCategories,
  selectListName,
  selectListDate,
  getList,
  selectState,
  selectError,
  changeErrorMessage,
} from "../store/reducers/historyListSlice";
import CategoryItems from "../components/CategoryItems";
import CalendarDetail from "../components/CalendarDetail";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "../sass/buttons.scss";
import "../sass/HistoryPage.scss";

const HistoryListPage = () => {
  const items = useSelector(selectItemsByCategories);
  const name = useSelector(selectListName);
  const date = useSelector(selectListDate);
  const state = useSelector(selectState);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getList(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      const timer = setInterval(() => {
        dispatch(changeErrorMessage());
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [dispatch, error]);

  interface HistoryCategories {
    category: string;
    items: {
      product_id: number;
      name: string;
      description: string;
      url: string;
      category: string;
    }[];
    accumLength: number;
  }

  const cats = items.map((cat: HistoryCategories) => (
    <div className="items__category" key={cat.category}>
      <h4 className="subheading subheading--items">{cat.category}</h4>
      <CategoryItems items={cat.items} add={false} ac={cat.accumLength} />
    </div>
  ));

  return (
    <div className="history">
      {error && <Message error>{error}</Message>}
      {state === "loading" ? (
        <Loader />
      ) : (
        <>
          <button
            className="btn btn--bright-text"
            onClick={() => history.go(-1)}
          >
            <TrendingFlatOutlinedIcon className="arrow" />
            back
          </button>
          <div className="history__header">
            <h1 className="heading">{name}</h1>
            <CalendarDetail date={date} />
          </div>
          <div className="history__items">{cats}</div>
        </>
      )}
    </div>
  );
};

export default HistoryListPage;
