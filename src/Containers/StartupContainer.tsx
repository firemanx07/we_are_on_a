import React, { useCallback, useEffect } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector, useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Dim } from '@/helpers/Dim'
import { initDB } from '@/helpers/dbUtils'
import { RNFileCache } from '@mutagen-d/react-native-file-cache'
import { hasDBemptyElem } from '@/Store/Selectors/DBSelectors'
import Geocoder from 'react-native-geocoding'
import { Config } from '@/Config'

const StartupContainer = () => {
  const { Layout, Fonts, Common, Images } = useTheme()

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const reInitialize = useAppSelector(hasDBemptyElem)

  const init = useCallback(async () => {
    await RNFileCache.load()
    await Geocoder.init(Config.MAP_KEY)
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    reInitialize && (await initDB(dispatch))
    await setDefaultTheme({ theme: 'default', darkMode: false })
  }, [reInitialize, dispatch])

  useEffect(() => {
    StatusBar.setHidden(true)
    init().then(() => {
      navigateAndSimpleReset('onBoarding')
    })
  }, [init])

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
