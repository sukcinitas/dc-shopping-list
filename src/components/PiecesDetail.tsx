import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSelector } from 'react-redux';
import { selectInEditState } from '../store/reducers/listSlice';

const PiecesDetail = ({
  pcs,
  simple,
  increaseAmount,
  decreaseAmount,
  deleteItem,
}: {
  pcs: number | undefined;
  simple?: boolean;
  increaseAmount?: () => void;
  decreaseAmount?: () => void;
  deleteItem?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isInEdit = useSelector(selectInEditState);

  if (isExpanded && isInEdit && !simple) {
    return (
      <span className="pieces__panel">
        <span
          className="pieces__icon pieces__icon--bright"
          onClick={deleteItem}
        >
          <DeleteOutlineIcon className="pieces__icon--inside" />
        </span>
        <RemoveIcon onClick={decreaseAmount} className="pieces__icon" />
        <span
          className="pieces pieces--panel"
          onClick={() => (isInEdit ? setIsExpanded(!isExpanded) : null)}
        >{`${pcs} pcs`}</span>
        <AddIcon onClick={increaseAmount} className="pieces__icon" />
      </span>
    );
  } else if (simple) {
    return <span className="pieces pieces--simple">{`${pcs} pcs`}</span>;
  } else {
    return (
      <span
        onClick={() => (isInEdit ? setIsExpanded(!isExpanded) : null)}
        className={isInEdit ? 'pieces' : 'pieces pieces--unclickable'}
      >{`${pcs} pcs`}</span>
    );
  }
};

export default PiecesDetail;
