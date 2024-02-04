/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import HelloWorld from './app/components/HelloWord/HelloWord';
import AuthForm from './app/components/Exercices/AuthForm';

AppRegistry.registerComponent(appName, () => AuthForm);
