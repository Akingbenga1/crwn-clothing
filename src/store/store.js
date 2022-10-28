import {rootReducer} from "./root-reducer";
import {applyMiddleware, compose, createStore} from "redux";
import logger from "redux-logger/src";

const middleWares = [logger];
const composedEnhancer = compose(applyMiddleware(...middleWares));
export const store = createStore(rootReducer, undefined, composedEnhancer);