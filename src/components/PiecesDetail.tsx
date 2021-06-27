import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const PiecesDetail = ({ pcs, simple }: { pcs: number|undefined, simple?: boolean }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    if (isExpanded && !simple) {
        return <span className="pieces__panel">
                <DeleteOutlineIcon className="pieces__icon pieces__icon--bright" />
                <AddIcon className="pieces__icon" />
                <span className="pieces pieces--panel">{`${pcs} pcs`}</span>
                <RemoveIcon className="pieces__icon" />
            </span>
    } else {
        return <span onClick={() => setIsExpanded(true)} className="pieces">{`${pcs} pcs`}</span> 
    }
}


export default PiecesDetail;