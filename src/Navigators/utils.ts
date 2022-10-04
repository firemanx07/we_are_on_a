/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
  DrawerActions,
} from '@react-navigation/native'
import { Pages, Stacks } from '@/enums/Pages'

export interface RootStackParamList extends Record<string, any> {
  Main: { screen: string; params?: any }
  Menu: { screen: string; params?: any }
  Drawer: {}
  [Pages.StartUp]: undefined
  [Pages.Home]: undefined
  [Pages.location]: undefined
  [Pages.SettingDetail]: undefined
  [Pages.Register]: undefined
  [Pages.Login]: undefined
  [Pages.ConfirmLinkPage]: { email: string }
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
    // StatusBar.setHidden(false)
  }
}

export function toggleDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.toggleDrawer())
  }
}

/***
 * navigate to the screen 'page' of the 'stackName' stack. Animation settings must be handled in stack definition
 * @param navigation
 * @param stackName - Name of the navigation stack
 * @param page
 * @param params - Route parameters.
 * @param animation
 */
export function pushScreen<ParamType extends keyof RootStackParamList>(
  stackName: Stacks,
  page: ParamType,
  params?: RootStackParamList[ParamType],
  animation?: boolean,
) {
  const parameters = { animationEnabled: animation ?? true, ...params }
  navigationRef.navigate(stackName, { screen: page, params: parameters })
}

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack()
  }
}
