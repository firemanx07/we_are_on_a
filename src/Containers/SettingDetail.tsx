import React from 'react'
import TitleDetailConatiner from '@/Containers/TitleDetailConatiner'
import { Text } from 'react-native'
import { useTypedRoute } from '@/Hooks/useTypedRoute'
import { Pages } from '@/enums/Pages'
import { toggleDrawer } from '@/Navigators/utils'

const SettingDetail = () => {
  const {
    params: { title },
  } = useTypedRoute<Pages.SettingDetail>()
  return (
    <TitleDetailConatiner title={title} onPress={() => toggleDrawer()}>
      <Text>TO-DO</Text>
    </TitleDetailConatiner>
  )
}

export default SettingDetail
