// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStore } from './';
import { connectPi } from './redux/pi/actions';
import { fetchWeather } from './redux/weather/actions';
import { fetchPimoroni } from './redux/pimoroni/actions';

import { saveFireprint } from './redux/firebase/actions';

class ClockWork extends Component {

    state = { timer: null }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() { this.stopTimer() }

    startTimer = () => {
        const store = getStore();
        store.dispatch({ type: `CLOCKWORK/START` });

        store.dispatch({
            type: "PI/SET_CONNECTING",
            connecting: false
        });

        const { tickDelay } = this.props;
        const {
            timer
        } = this.state;
        if (!timer) {
            this.setState({ timer: setInterval(this.tick, tickDelay * 1000) });
        }
        setTimeout(this.tick, tickDelay / 3);
    }

    tick = () => {
        const store = getStore();
        store.dispatch({ type: `CLOCKWORK/TICK` });
        const {
            fireprintInitted,
            ipLocationInitted,
            initting,
            initted,
            ticks,
            connecting,
            connected,
            weatherFetching,
            weatherFetched,
            pimoroniFetching,
            pimoroniFetched,
            secondsBetweenUpdates,
            ticking,
            // timeoutSecs,
            // started,
        } = this.props;

        if (!ticking) { return null }

        // if (Date.now() - started > timeoutSecs * 1000) {
        //     // console.log('GIVE UP!');
        //     store.dispatch({ type: `CLOCKWORK/PAUSE` });
        // }

        if (ticks % secondsBetweenUpdates === 0) {
            connectPi();
            fetchPimoroni();
            saveFireprint();
            store.dispatch({ type: `CAMERA/UPDATE` });
        }

        if (!connecting && !connected) {
            connectPi();
        }

        if (!weatherFetching && !weatherFetched) {
            fetchWeather();
        }

        if (!pimoroniFetching && !pimoroniFetched) {
            fetchPimoroni();
        }

        if (!initted) {
            if (!initting) {
                store.dispatch({ type: `USERENTITY/INIT` });
            }
        }
        if (fireprintInitted && ipLocationInitted && !initted) {
            store.dispatch({ type: `USERENTITY/INIT/COMPLETE` });
        }

    }

    stopTimer = () => {
        const store = getStore();
        store.dispatch({ type: `CLOCKWORK/PAUSE` });
        const {
            timer
        } = this.state;
        if (timer) {
            clearInterval(timer);
            this.setState({ timer: null });
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = (store) => {
    return {
        tickDelay: store.clockwork.tickDelay,
        ticking: store.clockwork.ticking,
        ticks: store.clockwork.ticks,
        secondsBetweenUpdates: store.clockwork.secondsBetweenUpdates,
        timeoutSecs: store.clockwork.timeoutSecs,
        started: store.clockwork.started,
        ////////////////////
        fireprintInitted: store.userEntity.fireprintInitted,
        ipLocationInitted: store.userEntity.ipLocationInitted,
        initting: store.userEntity.initting,
        initted: store.userEntity.initted,
        ////////////////////
        connected: store.pi.connected,
        connecting: store.pi.connecting,
        ////////////////////
        weatherFetching: store.weather.fetching,
        weatherFetched: store.weather.fetched,
        ////////////////////
        pimoroniFetching: store.pimoroni.fetching,
        pimoroniFetched: store.pimoroni.fetched,
        pimoroniLastFetchSuccess: store.pimoroni.lastFetchSuccess,
    };
};


export default (connect(mapStateToProps, null)(ClockWork));
