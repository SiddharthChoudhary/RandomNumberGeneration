/** @format */

import {AppRegistry} from 'react-native';
import App from './Modules/App';
import React from 'react'
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './Modules/store'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

const store = configureStore()
console.disableYellowBox=true
const RnRoot = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)
AppRegistry.registerComponent(appName, () => RnRoot);
