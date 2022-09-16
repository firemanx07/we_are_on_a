import React, { useEffect } from 'react'
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts , Common,Colors} = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter ,Common.backgroundPrimary]}>
        <Text style={Fonts.textCenter}>{t('welcome.top')}</Text>
         <Brand />
        <Text style={Fonts.textCenter}>{t('welcome.bottom')}</Text>

    </View>
  )
}

export default StartupContainer

