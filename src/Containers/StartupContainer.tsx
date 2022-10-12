import React, { useEffect } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Dim } from '@/helpers/Dim'
import { loadRegionsFiles } from '@/helpers/utils'

const StartupContainer = () => {
  const { Layout, Fonts, Common, Images } = useTheme()

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await loadRegionsFiles()
    await setDefaultTheme({ theme: 'default', darkMode: false })
    navigateAndSimpleReset('onBoarding')
  }

  useEffect(() => {
    StatusBar.setHidden(true)
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter, Common.backgroundPrimary]}>
      <Text
        style={[
          Fonts.textCenter,
          Fonts.textBeige200,
          { marginBottom: Dim.getDimension(162) },
        ]}
      >
        {t('welcome.top')}
      </Text>
      <Brand
        width={Dim.getHorizontalDimension(270)}
        height={Dim.getDimension(300)}
      />
      <View
        style={[
          {
            marginTop: Dim.getDimension(182),
          },
        ]}
      >
        <Image source={Images.partners} />
      </View>
    </View>
  )
}

export default StartupContainer
