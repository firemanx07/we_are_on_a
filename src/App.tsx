import 'react-native-gesture-handler'
import 'react-native-reanimated'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'
import OverlayLoader from '@/Components/OverlayLoader'
import { Colors } from '@/Theme/Variables'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => (
  // eslint-disable-next-line react-native/no-inline-styles
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate
        loading={<OverlayLoader backgroundColor={Colors.primary} />}
        persistor={persistor}
      >
        <BottomSheetModalProvider>
          <ApplicationNavigator />
        </BottomSheetModalProvider>
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
)

export default App
