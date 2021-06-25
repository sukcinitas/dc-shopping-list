import React from 'react';

const PiecesDetail = ({ pcs, simple }: { pcs: number|undefined, simple: boolean }) => 
    <span className={`pieces ${simple ? 'pieces--simple' : ''}`}>{undefined ? '' : `${pcs} pcs`}</span>

export default PiecesDetail;