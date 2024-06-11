import React from "react";

import "../sass/CompletedDetail.scss";

const CompletedDetail = ({ completed }: { completed: boolean }) => {
  const detail = completed ? (
    <span className="completed-detail">completed</span>
  ) : (
    <span className="completed-detail completed-detail--cancelled">
      cancelled
    </span>
  );
  return detail;
};

export default CompletedDetail;
