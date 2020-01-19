import { createReducer } from "@reduxjs/toolkit";
import { setConnecting, toggleExpand, onError, reset, save } from "./actions";

export const piSlice = {
  updated: Date.now(),
  baseUrl: `https://pi.listingslab.io/`,
  timeout: 6000,
  expanded: false,
  connected: false,
  connecting: false,
  lastConnectSuccess: null,
  piEpoch: null,
  error: true,
  version: false,
  pimoroni: null,
  location: null,
  lat: null,
  lng: null
};

const pi = createReducer(piSlice, {
  //
  [save]: (state, action) => {
    // console.log("save", action.data);
    state.updated = Date.now();
    state.error = false;
    state.connecting = false;
    state.connected = true;
    state.lastConnectSuccess = Date.now();
    state.piEpoch = action.data.epoch;
    state.version = action.data.version;
    state.description = action.data.description;
    state.pimoroni = action.data.pimoroni;
    state.location = action.data.location;
    state.lat = action.data.lat;
    state.lng = action.data.lng;
    return state;
  },

  [setConnecting]: (state, action) => {
    // console.log("setConnecting", action.connecting);
    state.updated = Date.now();
    state.connecting = action.connecting;
    return state;
  },

  [onError]: (state, action) => {
    // console.log("onError", action.error);
    state.updated = Date.now();
    state.error = action.error;
    return state;
  },

  [toggleExpand]: state => {
    state.updated = Date.now();
    state.expanded = !state.expanded;
    return state;
  },

  [reset]: () => {
    return piSlice;
  }
});

export { pi };
