import { Linking } from 'react-native'

export const openLink = (url: string) => async (): Promise<any> => {
  if (await Linking.canOpenURL(url)) {
    return Linking.openURL(url)
  } else {
    const error = new Error(`Cannot open link with URL: ${url}`)
  }
}
