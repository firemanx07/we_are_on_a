import { NavigationProp, useNavigation } from '@react-navigation/native'

export const useTypedNavigation = <T extends {}>() => {
  return useNavigation<NavigationProp<T>>()
}
