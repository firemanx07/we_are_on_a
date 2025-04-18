/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notification by message
// LogBox.ignoreAllLogs() //Ignore all log notifications

AppRegistry.registerComponent(appName, () => App)
