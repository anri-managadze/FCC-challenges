import React, {useEffect, useRef, useState} from 'react';
import './clockStyle.css';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const Clock = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [stage, setStage] = useState("Session");
    const [sessionTime, setSessionTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [timeLeft, setTimeLeft] = useState(
        () => (stage === "Session" ? sessionTime : breakTime) * 60
    );


    const audioRef = useRef();
    function playSound() {
        if (audioRef.current !== null) {
            audioRef.current.play();
        }
    }
    function resetSound() {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    const minToSec = (min) => min * 60;
    const formatTime = (secRaw) => {
        let min = (secRaw / 60) ^ 0;
        let sec = secRaw % 60 ^ 0;
        min = min < 10 ? `0${min}` : min;
        sec = sec < 10 ? `0${sec}` : sec;
        return `${min}:${sec}`;
    };

    const increaseSessionTime = () => {
        if (sessionTime < 60 && !isRunning) {
            setSessionTime((prevSessionTime) => prevSessionTime + 1);
            setTimeLeft((prevTimeLeft) => prevTimeLeft + 60);
        } else {
            return false;
        }
    };
    const decreaseSessionTime = () => {
        if (sessionTime > 1 && !isRunning) {
            setSessionTime((prevSessionTime) => prevSessionTime - 1);
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 60);
        } else {
            return false;
        }
    };
    const increaseBreakTime = () => {
        if (breakTime < 60 && !isRunning) {
            setBreakTime((prevBreakTime) => prevBreakTime + 1);
        } else {
            return false;
        }
    };
    const decreaseBreakTime = () => {
        if (breakTime > 1 && !isRunning) {
            setBreakTime((prevBreakTime) => prevBreakTime - 1);
        } else {
            return false;
        }
    };

    const reset = () => {
        setStage("Session");
        setSessionTime(25);
        setBreakTime(5);
        setTimeLeft(() => minToSec(25));
        setIsRunning(false);
        resetSound();
    };

    const startPause = () => {
        setIsRunning((prev) => !prev);
    };


    useEffect(() => {
        let timer = null;
        if (timeLeft === 0) {
            setStage((prevStage) => (prevStage === "Session" ? "break" : "Session"));
            setTimeLeft(() =>
                minToSec(stage === "Session" ? breakTime : sessionTime)
            );
            playSound();
            return () => {
                clearInterval(timer);
            };
        }

        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
        } else if (!isRunning && timeLeft !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [breakTime, isRunning, sessionTime, stage, timeLeft]);

    return (
        <div className='container'>
            <h1>25 + 5 Clock</h1>
                <div className="timer_display">
                    <div id="timer-label">{stage}</div>
                    <div id="time-left">{formatTime(timeLeft)}</div>
                </div>
            <div className="settings">
                <div className={`session`}>
                    <div id={`session-label`}>Session</div>
                    <div className={`settings-wrap`}>
                        <button id={`session-increment`} onClick={increaseSessionTime}>+</button>
                        <div id={`session-length`}>{sessionTime}</div>
                        <button id={`session-decrement`} onClick={decreaseSessionTime}>-</button>
                    </div>
                </div>

                <div className={`break`}>
                    <div id={`break-label`}>Break</div>
                    <div className={`settings-wrap`}>
                        <button id={`break-increment`} onClick={increaseBreakTime}>+</button>
                        <div id={`break-length`}>{breakTime}</div>
                        <button id={`break-decrement`} onClick={decreaseBreakTime}>-</button>
                    </div>
                </div>
                <div className="timer_buttons">
                    {isRunning ?
                        <button id="start_stop" className="btn" onClick={startPause}><PauseCircleFilledIcon /></button>
                        :
                        <button id="start_stop" className="btn" onClick={startPause}><PlayCircleFilledIcon /> </button>
                    }
                    <button id="reset" className="btn reset" onClick={reset}><RotateLeftIcon /></button>
                </div>
            </div>
            <audio
                id="beep"
                ref={(el) => (audioRef.current = el)}
                src={"https://www.soundjay.com/clock/sounds/clock-ticking-5.mp3"}
            />
        </div>
    );
};

export default Clock;