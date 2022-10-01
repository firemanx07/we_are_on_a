import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'

export const useTypedRoute = <T extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, T>>()
}
