import React from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';

import '../sass/ConfirmationBox.scss';
import '../sass/headings.scss';
import '../sass/buttons.scss';

const ConfirmationBox = ({
  cb,
  close,
}: {
  cb: (e: React.MouseEvent<HTMLElement>) => void;
  close: () => void;
}) =>
  ReactDOM.createPortal(
    <div className="confirmation-box">
      <div className="confirmation-box__box">
        <CloseIcon className="confirmation-box__icon" onClick={close} />
        <h2 className="heading heading--box">
          Are you sure that you want to cancel this list?
        </h2>
        <div className="btns btns--box">
          <button className="btn" onClick={close}>
            cancel
          </button>
          <button className="btn btn--danger" onClick={(e) => cb(e)}>
            Yes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );

export default ConfirmationBox;
