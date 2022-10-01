import React from 'react'
import BackgroundImageContainer from '@/Containers/BackgroundImageContainer'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Dim } from '@/helpers/Dim'
import { navigate, toggleDrawer } from '@/Navigators/utils'
import { Brand } from '@/Components'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import ButtonWithDescription from '@/Components/ButtonWithDescription'
import Bell from '@/Assets/Images/svg/Bell-white.svg'
import FavoriteEmpty from '@/Assets/Images/svg/favorite_empty.svg'
import { Pages } from '@/enums/Pages'

const RegisterScreen = () => {
  const { Images, Colors, Layout, Gutters, Fonts, Common } = useTheme()
  const { t } = useTranslation()
  const { dismissAll } = useBottomSheetModal()
  useFocusEffect(() => {
    dismissAll()
  })
  return (
    <BackgroundImageContainer source={Images.register.background}>
      <LinearGradient
        style={[Layout.fill, Layout.colVCenter, Layout.justifyContentAround]}
        colors={[
          Colors.primary + '80',
          Colors.primary + '80',
          Colors.primary + 'F2',
        ]}
      >
        <View
          style={[
            Layout.rowHCenter,
            Layout.fullWidth,
            Gutters.regularHPadding,
            Layout.justifyContentBetween,
            { flexBasis: 1, marginTop: Dim.getDimension(60) },
          ]}
        >
          <TouchableOpacity onPress={() => toggleDrawer()}>
            <Image source={Images.menu.close} />
          </TouchableOpacity>
          <View
            style={[
              Layout.fill,
              Layout.rowCenter,
              { marginLeft: Dim.getHorizontalDimension(-45) },
            ]}
          >
            <Brand
              width={Dim.getHorizontalDimension(100)}
              height={Dim.getDimension(75)}
            />
          </View>
          <View />
        </View>
        <View style={[Layout.fullWidth, Layout.center]}>
          <Text style={[Fonts.textWhite, Fonts.textLarge, Fonts.textCenter]}>
            {t('signUp.title')}
          </Text>
        </View>
        <View style={[Gutters.largeHPadding, Layout.fullWidth]}>
          <ButtonWithDescription
            title={t('signUp.cta1.title')}
            Icon={Bell}
            style={[Gutters.regularBMargin]}
            description={t('signUp.cta1.desc')}
          />

          <ButtonWithDescription
            title={t('signUp.cta2.title')}
            Icon={FavoriteEmpty}
            description={t('signUp.cta2.desc')}
          />
        </View>
        <View>
          <TouchableOpacity
            style={[
              Common.button.outlineRounded,
              Gutters.regularBMargin,
              Common.button.largeButton,
              Gutters.regularTMargin,
            ]}
            onPress={() => {
              navigate(Pages.RegisterForm, [])
            }}
          >
            <Text style={[Fonts.textRegular, Fonts.textMedium]}>
              {t('signUp.button')}
            </Text>
          </TouchableOpacity>
          <Text
            style={[Fonts.textWhite, Fonts.textCenter, Fonts.textExtraSmall]}
          >
            {t('signUp.notice')}
          </Text>
        </View>
        <View style={[Layout.rowCenter]}>
          <Text
            style={[Fonts.textWhite, Fonts.textCenter, Fonts.textNormal500]}
          >
            {t('signUp.loginMessage')}
          </Text>
          <TouchableOpacity>
            <Text
              style={[
                Fonts.textBrown,
                Fonts.textCenter,
                Fonts.textNormal500,
                Gutters.tinyLMargin,
              ]}
            >
              {t('signUp.loginButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </BackgroundImageContainer>
  )
}

export default RegisterScreen
