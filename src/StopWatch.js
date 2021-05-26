import React, {useState} from 'react';
import style from './StopWatch.scss';
import {Observable} from "rxjs";
import {startWith} from "rxjs/operators";

const StopWatch = () => {
    let [second, setSecond] = useState(0);
    let [minutes, setMinutes] = useState(0);
    let [hours, setHours] = useState(0);
    let [subscription, setSubscription] = useState();
    let [reset, setReset] = useState(false);
    let count = 1;


    const stopWatch$ = new Observable(observer => {
        reset ? startWith(count) : startWith(count = second + 1)
        setInterval(() => {
            observer.next(count++)
        }, 1000)
    })

    const observer = {next: value => setSecond(value)}

    const startTimer = () => {
        setReset(false);
        setSubscription(stopWatch$.subscribe(observer))
    }

    const stopTimer = () => {
        setReset(false);
        subscription.unsubscribe()
        setSecond(0)
    }

    const waitTimer = e => {
        if (e.detail === 2) {
            setReset(false);
            subscription.unsubscribe()
        }
    }

    const resetTimer = () => {
        setReset(true);
        subscription.unsubscribe()
        setSubscription(stopWatch$.subscribe(observer))
    }

    return (
        <div className={'stopwatch'}>
            <div className={'stopwatch__wrapper'}>
                <span>{hours}</span>
                <span>:</span>
                <span>{minutes}</span>
                <span>:</span>
                <span>{second}</span>
            </div>

            <div className={'stopwatch__buttons'}>
                <button onClick={startTimer} className={'stopwatch__button'}>Start</button>
                <button onClick={stopTimer} className={'stopwatch__button'}>Stop</button>
                <button onClick={waitTimer} className={'stopwatch__button'}>Wait</button>
                <button onClick={resetTimer} className={'stopwatch__button'}>Reset</button>
            </div>

        </div>
    );
};

export default StopWatch;