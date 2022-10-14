import React from 'react'
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { Dim } from '@/helpers/Dim'
import BackgroundImageContainer from '@/Containers/BackgroundImageContainer'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import { useTheme } from '@/Hooks'

const WelcomeScreen = () => {
  const { Layout, Gutters, Fonts, Common, Images, Colors } = useTheme()
  const { textRegular, textMedium, textBeige100, textCenter } = Fonts
  const { t } = useTranslation()

  return (
    <BackgroundImageContainer source={Images.onBoarding}>
      <LinearGradient
        style={[Layout.fill, Layout.colVCenter, Layout.justifyContentEnd]}
        colors={[
          Colors.primary + '80',
          Colors.primary + '80',
          Colors.primary + 'F2',
        ]}
      >
        <Brand
          width={Dim.getHorizontalDimension(270)}
          height={Dim.getDimension(300)}
        />
        <Text
          style={[
            textRegular,
            textMedium,
            textBeige100,
            textCenter,
            styles.marginT80,
            { width: Dim.getHorizontalDimension(320) },
          ]}
        >
          {t('welcome.onBoarding.description')}
        </Text>

        <TouchableOpacity
          style={[
            Common.button.outlineRounded,
            Gutters.regularBMargin,
            Common.button.largeButton,
            styles.marginT32,
          ]}
          onPress={() => {
            navigate('location', [])
            StatusBar.setHidden(false)
          }}
        >
          <Text style={[Fonts.textRegular, Fonts.textMedium]}>
            {t('welcome.onBoarding.button')}
          </Text>
        </TouchableOpacity>
        <View style={[styles.bottomFooter]}>
          <Image source={Images.partners} />
        </View>
      </LinearGradient>
    </BackgroundImageContainer>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  bottomFooter: {
    marginTop: Dim.getDimension(32),
    marginBottom: Dim.getDimension(60),
  },
  marginT80: {
    marginTop: Dim.getDimension(80),
  },
  marginT32: {
    marginTop: Dim.getDimension(32),
  },
})
