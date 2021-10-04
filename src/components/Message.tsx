import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import '../sass/Message.scss';

const Message = ({children, success, error}: {children: any, success?: boolean; error?: boolean}) => {
    return  <div className={`message message--${error ? 'error' : ''}${success ? 'success' : ''}`}>
                {error && <ErrorOutlineIcon />}
                {success && <CheckIcon />}
                <p>{children}</p>
            </div>;
}

export default Message;