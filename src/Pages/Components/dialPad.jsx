import React from 'react';
import './dialPad.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { StartCall } from '../../jsp';

DialPad.propTypes = {
    setIsCalling: PropTypes.func,
    isCalling: PropTypes.bool,
    phoneNumber: PropTypes.string,
    setPhoneNumber: PropTypes.func,
    setCallStatus: PropTypes.func,
    setIsMute: PropTypes.func,
};

DialPad.defaultProps = {
    setIsCalling: null,
    isCalling: false,
    phoneNumber: "",
    setPhoneNumber: null,
    setCallStatus: null,
    setIsMute: null
}

function DialPad(props) {
    const { setIsCalling, isCalling, phoneNumber, setPhoneNumber, setCallStatus, setIsMute } = props;
    const handleChangeNumber = (e) => {
        const re = /^[0-9|*|#\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setPhoneNumber(e.target.value);
        }
    }
    const handleSetNumber = (e) => {
        if (phoneNumber.length < 11) {
            let t = phoneNumber;
            t += e.target.innerHTML;
            setPhoneNumber(t);
        }
    }
    const handleDelNumber = () => {
        if (phoneNumber.length > 0) {
            let t = phoneNumber;
            t = (t).slice(0, -1);
            setPhoneNumber(t);
        }
    }
    return (
        <div className="dialPad" style={isCalling ? { opacity: "0", zIndex: "-1", visibility: "hidden" } : { opacity: "1", zIndex: "1", visibility: "visible" }}>
            <div className="dialPad__showNumber">
                <div className="dialPad__showNumber__numberPhone">
                    <input
                        type='text'
                        maxLength="11"
                        onChange={handleChangeNumber}
                        value={phoneNumber}
                    />
                </div>
                <div className="dialPad__showNumber__del">
                    <FontAwesomeIcon onClick={handleDelNumber} icon={faBackspace} />
                </div>
            </div>
            <div className="dialPad__keyboard">
                <div className="dialPad__keyboard__1" onClick={handleSetNumber}>1</div>
                <div className="dialPad__keyboard__2" onClick={handleSetNumber}>2</div>
                <div className="dialPad__keyboard__3" onClick={handleSetNumber}>3</div>
                <div className="dialPad__keyboard__4" onClick={handleSetNumber}>4</div>
                <div className="dialPad__keyboard__5" onClick={handleSetNumber}>5</div>
                <div className="dialPad__keyboard__6" onClick={handleSetNumber}>6</div>
                <div className="dialPad__keyboard__7" onClick={handleSetNumber}>7</div>
                <div className="dialPad__keyboard__8" onClick={handleSetNumber}>8</div>
                <div className="dialPad__keyboard__9" onClick={handleSetNumber}>9</div>
                <div className="dialPad__keyboard__A" onClick={handleSetNumber}>*</div>
                <div className="dialPad__keyboard__0" onClick={handleSetNumber}>0</div>
                <div className="dialPad__keyboard__Z" onClick={handleSetNumber}>#</div>
            </div>
            <div className="dialPad__Call">
                <button
                    type="submit"
                    className="dialPad__Call__button"
                    disabled={phoneNumber.length === 0}
                    onClick={() => StartCall(phoneNumber, setIsCalling, setCallStatus, setIsMute)}
                >
                    Call
                </button>
            </div>
        </div>
    );
}

export default DialPad;