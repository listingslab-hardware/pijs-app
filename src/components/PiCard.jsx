import React from 'react';
import { getStore } from '../';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core/';
import { Icon } from './';
import {
    Camera,
    Connection,
    WeatherHeadline,
} from './';

const useStyles = makeStyles(theme => ({
    screen: {
        minHeight: '100vh',
        border: '1px solid rgba(241,221,63,0)',
    },
    heading: {
        // border: '1px solid white',
        display: 'flex',
    },
    headingRight: {
        // border: '1px solid pink',
    },
    headingAppName: {
        // border: '1px solid pink',
        paddingTop: theme.spacing(),
    },
    homeBtn: {
        // border: '1px solid rgba(241,221,63,0.4)',
    },
    connectionBtn: {
        // border: '1px solid rgba(241,221,63,0.4)',
    },
    grow: {
        flexGrow: 1,
    },
    white: {
        color: 'white',
    }
}));


function PiCard() {
    const store = getStore();
    const classes = useStyles();
    const { pi, system } = useSelector(state => state);
    const {
        connectionOpen,
    } = system;
    const {
        // error,
        timeout,
        lastConnectSuccess,
        location
    } = pi;

    let status =
    {
        icon: `connected`,
        color: `primary`,
        subheader: location,
    };
    if (Date.now() - lastConnectSuccess > timeout) {
        status = {
            icon: `disconnected`,
            color: `secondary`,
            subheader: `Connecting ...`,
        }
    }

    return (
        <React.Fragment>
            <div className={classes.screen}>
                <div className={classes.heading}>

                    <div className={classes.headingLogo}>
                        <Tooltip title={`Restart`}>
                            <IconButton
                                className={classes.homeBtn}
                                onClick={() => {
                                    store.dispatch({ type: `SYSTEM/RESTART` });
                                }}
                                color={`inherit`}>
                                <Icon icon={`pi`} color={`inherit`} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.headingAppName}>
                        <Typography variant={`h6`} className={classes.white}>
                            PiJS.app
                        </Typography>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.actions}>
                        {connectionOpen ?
                            <Connection />
                            :
                            <Tooltip title={`Open Connection`}>
                                <IconButton
                                    className={classes.connectionBtn}
                                    onClick={() => {
                                        store.dispatch({
                                            type: `SYSTEM/DIALOG/CONNECTION`,
                                            open: true
                                        });
                                    }}>
                                    <Icon icon={status.icon} color={`secondary`} />
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                </div>
                <Camera />
                <WeatherHeadline />
            </div>
        </React.Fragment >
    );
}

const MemodFuncComponent = React.memo(PiCard);
export default MemodFuncComponent;