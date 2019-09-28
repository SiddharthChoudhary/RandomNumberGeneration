/** @format */

import {AppRegistry} from 'react-native';
import App from './Modules/App';
import {name as appName} from './app.json';
console.disableYellowBox=true
AppRegistry.registerComponent(appName, () => App);
