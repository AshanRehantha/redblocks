import {
  compose,
  createStore,
  applyMiddleware,
  Middleware,
  combineReducers,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../saga';
import rootReducer from '../reducers';
import { loadingMiddleware } from '../middlewares';
import { messageMiddleware } from '../middlewares/message.middleware';

const sagaMiddleware = createSagaMiddleware();

const rootReducerWithRouter = combineReducers({
  ...rootReducer,
});

const middleWares = [
  process.env.NODE_ENV === 'development' && logger,
  sagaMiddleware,
  messageMiddleware,
  loadingMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducerWithRouter);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
