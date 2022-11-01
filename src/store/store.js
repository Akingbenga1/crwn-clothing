import {rootReducer} from "./root-reducer";
import {applyMiddleware, compose, createStore} from "redux";
import logger from "redux-logger/src";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {rootSaga} from "./root-saga";
import createSagaMiddleware from 'redux-saga';
// import thunk from "redux-thunk";

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ['cart'],
}


const sagaMiddleware =  createSagaMiddleware();

const persistedReducer =  persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware].filter(Boolean);
//
// const thunkMiddleware =  (store) => (next) =>  (action) =>
// {
//     if(typeof (action) === 'function')
//     {
//         action(dispatch);
//     }
// }

const composedEnhancer = compose(process.env.NODE_ENV !== "production" &&
window &&
window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__) || compose;



const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);