import * as JsSIP from 'jssip';

let ua = null;
let session = null;
const remoteAudio = new window.Audio();
remoteAudio.autoplay = true;

// const localStream = document.getElementsByClassName('Calling__title__localStream');
// let localStreams = new MediaStream();
// localStream.srcObject = localStreams;
// localStream.autoplay = true;

export function Register() {
    const socket = new JsSIP.WebSocketInterface('wss://sbc03.tel4vn.com:7444');
    const configuration = {
        sockets: [socket],
        uri: 'sip:103@2-test4.gcalls.vn:50061',
        password: 'test4103'
    };

    ua = new JsSIP.UA(configuration);

    ua.register()

    ua.on('connected', (e) => { console.log('Phone Connected') });
    ua.on('disconnected', function (e) { console.log('Phone Disconnected ->', e) });

    ua.on('newRTCSession', function (e) {
        console.log('RTC Session', e.session)
        const newSession = e.session;
        if (session) {
            session.terminate();
        }
        session = newSession;
        const completeSession = () => {
            session = null;
        }
        session.on('ended', completeSession);
        session.on('failed', completeSession);
        session.on('accepted', () => { console.log("accept") });
        session.on('confirmed', () => {
            console.log("confirmed");
        });
        session.on('addstream', function (e) {
            console.log("addstream")
        });

        const fromNumber = e.request.from._uri._user;
        const toNumber = e.request.to._uri._user;
        console.log(fromNumber, toNumber);
    });

    ua.on('registered', function (e) { console.log('SIP Registered') });
    ua.on('unregistered', function (e) { console.log('SIP Unregistered') });
    ua.on('registrationFailed', function (e) { console.log('SIP Registration Failed ->', e) });

    ua.start();
}

export function Stop() {
    session.terminate();
}

export function ToggleMute(setIsMute, isMute) {
    setIsMute(!isMute);
    if (session.isMuted().audio) {
        session.unmute({ audio: true });
        console.log('UNMUTE');
    } else {
        session.mute({ audio: true });
        console.log('MUTE');
    }
}


export function StartCall(destination, setIsCalling, setCallStatus, setIsMute) {
    setIsCalling(true);

    const eventHandlers = {
        'progress': function (e) {
            console.log('call is in progress', e);
            setCallStatus("Ringing...");
        },
        'failed': function (e) {
            console.log('call failed with cause: ', e);
            setIsCalling(false);
            setCallStatus("");
            setIsMute(false);
        },
        'ended': function (e) {
            console.log('call ended with cause: ', e);
            setIsCalling(false);
            setCallStatus("");
            setIsMute(false);
            console.log(session.start_time, session.end_time);
        },
        'confirmed': function (e) {
            console.log('call confirmed', e);
            setCallStatus("In Call");
        }
    };

    const options = {
        'eventHandlers': eventHandlers,
        'mediaConstraints': { 'audio': true, 'video': false },
        sessionTimersExpires: 600
    };
    ua.call(destination, options);


    session.connection.addEventListener('addstream', (event) => {
        console.log(event)
        remoteAudio.srcObject = event.stream;
        remoteAudio.play();

        // const remoteStream = document.getElementsByClassName('Calling__title__remoteStream');
        // localStreams.addTrack(session.connection.getSenders()[0].track);
        // remoteStream.srcObject = event.stream;
        // console.log(localStream, remoteStream, remoteAudio);
        // localStream.play();
        // remoteStream.play();
    })
}
export default { Register, StartCall, Stop, ToggleMute };


