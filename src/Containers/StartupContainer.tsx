import React, { useEffect } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Dim } from '@/helpers/Dim'

const StartupContainer = () => {
  const { Layout, Fonts, Common, Images } = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
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
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsBaseLine,
          {
            width: Dim.getHorizontalDimension(190.5),
            marginTop: Dim.getDimension(182),
          },
        ]}
      >
        <Text style={[Fonts.textCenter, Fonts.textBeige200]}>
          {t('welcome.bottom')}
        </Text>
        <Image
          style={{
            width: Dim.getHorizontalDimension(49),
            height: Dim.getDimension(27),
          }}
          source={Images.evian}
        />
      </View>
    </View>
  )
}

export default StartupContainer
