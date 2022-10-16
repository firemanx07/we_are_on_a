import React from 'react'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAppSelector, useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { Dim } from '@/helpers/Dim'
import { selectSelectedZone } from '@/Store/Selectors/RegionsSelectors'
import { capitalizeFirstLetter } from '@/helpers/utils'

const LoadingCityModal = () => {
  const { Layout, Fonts, Common } = useTheme()

  const { t } = useTranslation()
  const region = useAppSelector(selectSelectedZone)

  return (
    <View style={[Layout.fill, Layout.colCenter, Common.backgroundPrimary]}>
      <Brand
        width={Dim.getHorizontalDimension(270)}
        height={Dim.getDimension(300)}
      />
      <View
        style={[
          {
            marginTop: Dim.getDimension(70),
          },
        ]}
      >
        <View>
          <Text style={[Fonts.textBeige100, Fonts.textCenter, Fonts.textLarge]}>
            {capitalizeFirstLetter(region.zone)}
          </Text>
          <Text
            style={[Fonts.titleSmall, Fonts.textCenter, Fonts.textBeige200]}
          >
            {t('city.loadingText').toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default LoadingCityModal
