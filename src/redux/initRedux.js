import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reduxBatch } from "@manaflair/redux-batch";
import { advert, advertSlice } from "./advert/reducer";
import { camera, cameraSlice } from "./camera/reducer";
import { clockwork, clockworkSlice } from "./clockwork/reducer";
import { firebase, firebaseSlice } from "./firebase/reducer";
import { pi, piSlice } from "./pi/reducer";
import { pimoroni, pimoroniSlice } from "./pimoroni/reducer";
import { system, systemSlice } from "./system/reducer";
import { weather, weatherSlice } from "./weather/reducer";

const initRedux = () => {
  const reducer = combineReducers({
    advert,
    camera,
    clockwork,
    firebase,
    pi,
    pimoroni,
    system,
    weather
  });

  const preloadedState = {
    advert: advertSlice,
    camera: cameraSlice,
    clockwork: clockworkSlice,
    firebase: firebaseSlice,
    pi: piSlice,
    pimoroni: pimoroniSlice,
    system: systemSlice,
    weather: weatherSlice
  };

  const middleware = [
    ...getDefaultMiddleware({
      serializableCheck: false
    })
  ];

  const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
    enhancers: [reduxBatch]
  });

  return store;
};

export default initRedux;
