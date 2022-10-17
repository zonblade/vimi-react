import React from 'react';
import Main from './component/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/index';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
