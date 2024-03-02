import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store} >
      <PersistGate loading={null} persistor={persistStore(store)} >
        <App />
      </PersistGate>
    </Provider>

);


