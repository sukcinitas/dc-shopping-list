import React from 'react';

import '../sass/Header.scss';

const Tooltip = ({ children }: { children: React.ReactNode }) => (
  <span className="tooltip">{children}</span>
);

export default Tooltip;
