import React, {useState} from 'react';
import {Observable} from "rxjs";
import {startWith} from "rxjs/operators";
import style from './StopWatch.scss';

const StopWatch = () => {
    let [time, setTime] = useState(0);
    let [subscription, setSubscription] = useState();
    let [started, setStarted] = useState(false);
    let count = 0;
    let reset = false;

    const stopWatch$ = new Observable(observer => {
        startWith(reset ? count = 1 : count = time + 1);
        setInterval(() => {
            observer.next(count++);
        }, 1000);
    })

    const observer = {next: value => setTime(value)}

    const startTimer = () => {
        if (!started) {
            setStarted(true);
            setSubscription(stopWatch$.subscribe(observer));
        }
    }

    const stopTimer = () => {
        if (started) {
            setStarted(false);
            subscription.unsubscribe();
            setTime(0);
        }
    }

    const waitTimer = () => {
        if (started) {
            setStarted(false);
            subscription.unsubscribe();
        }
    }

    const resetTimer = () => {
        if (started) {
            reset = true;
            subscription.unsubscribe();
            setSubscription(stopWatch$.subscribe(observer));
        }
    }

    return (
        <div className={'stopwatch'}>
            <div className={'stopwatch__wrapper'}>
                <span>{Math.floor(time/3600) < 10 ? `0${Math.floor(time/3600)}` : Math.floor(time/3600)}</span>
                :
                <span>{Math.floor((time/60)%60) < 10 ? `0${Math.floor((time/60)%60)}` : Math.floor((time/60)%60)}</span>
                :
                <span>{Math.floor(time%60) < 10 ? `0${Math.floor(time%60)}` : Math.floor(time%60)}</span>
            </div>

            <div className={'stopwatch__buttons'}>
                <button onClick={startTimer} className={'stopwatch__button'}>Start</button>
                <button onClick={stopTimer} className={'stopwatch__button'}>Stop</button>
                <button onDoubleClick={waitTimer} className={'stopwatch__button'}>Wait</button>
                <button onClick={resetTimer} className={'stopwatch__button'}>Reset</button>
            </div>

        </div>
    );
};

export default StopWatch;