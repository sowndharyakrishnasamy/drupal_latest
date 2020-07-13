import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const Message = props => {
return <div className={`alert alert-${props.type} fade in`}>{props.text}</div>;
};

Message.propTypes = {
text: PropTypes.string,
type: PropTypes.string,
};

export default Message;