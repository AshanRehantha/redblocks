import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import 'semantic-ui-css/semantic.min.css'
import 'rsuite/dist/rsuite.min.css';
import './styles/styles.scss';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <Provider store={store} stabilityCheck="never">
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
