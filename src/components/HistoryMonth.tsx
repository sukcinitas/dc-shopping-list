import React from "react";
import { Link } from "react-router-dom";

import CompletedDetail from "./CompletedDetail";
import CalendarDetail from "./CalendarDetail";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../sass/HistoryMonth.scss";
import "../sass/headings.scss";

const HistoryMonth = ({
  month,
  items,
}: {
  month: string;
  items: { list_id: number; updated_at: string; name: string; state: string }[];
}) => {
  return (
    <div className="history__month">
      <h4 className="subheading subheading--date">{month}</h4>
      <div className="history__items">
        {items.map(({ name, state, updated_at, list_id }, idx) => (
          <div
            key={list_id}
            className="history__item"
            style={{ animationDelay: idx * 0.1 + "s" }}
          >
            <h6 className="subheading subheading--history-item">{name}</h6>
            <div className="history__item-details">
              <CalendarDetail date={updated_at} />
              <CompletedDetail completed={state === "completed"} />
            </div>
            <button className="btn btn--arrow">
              <Link to={`${list_id}`}>
                <ArrowForwardIosIcon />
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryMonth;
