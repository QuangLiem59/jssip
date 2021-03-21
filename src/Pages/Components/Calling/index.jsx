import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAltSlash, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Stop, ToggleMute } from '../../../jsp';

Calling.propTypes = {
    setIsCalling: PropTypes.func,
    isCalling: PropTypes.bool,
    phoneNumber: PropTypes.string,
    callStatus: PropTypes.string,
    isMute: PropTypes.bool,
    setIsMute: PropTypes.func
};

Calling.defaultProps = {
    setIsCalling: null,
    isCalling: false,
    phoneNumber: "",
    callStatus: "",
    isMute: false,
    setIsMute: null
}

function Calling(props) {
    const { setIsCalling, isCalling, phoneNumber, callStatus, isMute, setIsMute } = props;
    return (
        <div className="Calling" style={isCalling ? { opacity: "1", zIndex: "1", visibility: "visible" } : { opacity: "0", zIndex: "-1", visibility: "hidden" }}>
            <div className="Calling__title">
                <div className="Calling__title__icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="Calling__title__status">
                    {callStatus}
                </div>
                <div className="Calling__title__phoneNumber">
                    {phoneNumber}
                </div>
            </div>
            <div className="Calling__option">
                <div className="Calling__option__icon">
                    <FontAwesomeIcon
                        icon={faMicrophoneAltSlash}
                        style={isMute ? { color: 'purple' } : { color: 'white' }}
                        onClick={() => ToggleMute(setIsMute, isMute)}
                    />
                </div>
            </div>
            <div className="Calling__button">
                <button className="Calling__button__btn" onClick={() => Stop()}>
                    <FontAwesomeIcon icon={faPhone} />
                </button>
            </div>
        </div>
    );
}

export default Calling;