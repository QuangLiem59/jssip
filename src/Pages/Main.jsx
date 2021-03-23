import React, { useEffect, useState } from 'react';
import './Main.scss';
import DialPad from './Components/dialPad';
import JSP from '../jsp';
import Calling from './Components/Calling';

Main.propTypes = {
};

function Main() {
    const [isCalling, setIsCalling] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [callStatus, setCallStatus] = useState("");
    const [isMute, setIsMute] = useState(false);
    useEffect(() => {
        JSP.Register();
    }, []);
    return (
        <div className="Main">
            <div className="Main__container">
                <DialPad
                    setIsCalling={setIsCalling}
                    isCalling={isCalling}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    setCallStatus={setCallStatus}
                    setIsMute={setIsMute}
                />
                <Calling
                    setIsCalling={setIsCalling}
                    isCalling={isCalling}
                    phoneNumber={phoneNumber}
                    callStatus={callStatus}
                    isMute={isMute}
                    setIsMute={setIsMute}
                />
            </div>
        </div>
    );
}

export default Main;