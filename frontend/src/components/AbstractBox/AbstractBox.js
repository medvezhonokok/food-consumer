import React from 'react';
import './AbstractBox.css';
import './../../index.css';

const AbstractBox = ({title, body, footer}) => {
    return (
        <div className="boxContainer centeredContent borderedContent">
            {title && <div className="boxTitle">{title}</div>}
            {body && <div className="boxBody">{body}</div>}
            {footer && <div className="boxFooter">{footer}</div>}
        </div>
    )
};

export default AbstractBox;
