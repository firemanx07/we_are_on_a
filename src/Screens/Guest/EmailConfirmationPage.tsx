import React from 'react'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import TitleDetailConatiner from '@/Containers/TitleDetailConatiner'
import { Brand } from '@/Components'
import { Dim } from '@/helpers/Dim'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTypedRoute } from '@/Hooks/useTypedRoute'
import { Pages } from '@/enums/Pages'
import { openLink } from '@/helpers/linking'

const EmailConifirmationPage = () => {
  const { Layout, Gutters, Fonts, Common, Images } = useTheme()
  const { t } = useTranslation()
  const route = useTypedRoute<Pages.ConfirmLinkPage>()
  return (
    <TitleDetailConatiner
      disableScroll
      title={' '}
      style={[Layout.colVCenter, Layout.justifyContentAround]}
    >
      <Brand
        imageSource={Images.register.emailRegister}
        width={Dim.getHorizontalDimension(118)}
        height={Dim.getDimension(120)}
      />
      <View style={[Layout.fullWidth, Layout.colVCenter]}>
        <Text style={[Fonts.textPrimary, Fonts.textMedium24]}>
          {t('signUp.confirm.sendTo')}
        </Text>
        <Text style={[Fonts.textPrimary, Fonts.textMedium24]}>
          {route.params.email}
        </Text>
      </View>
      <View style={[Layout.fullWidth, Layout.colVCenter]}>
        <Text
          style={[Fonts.textGrey100, Fonts.textNormal, Fonts.textCenter]}
          textBreakStrategy={'simple'}
        >
          {t('signUp.confirm.notice')}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          Common.button.rounded,
          Common.button.largeButton,
          Gutters.largeTMargin,
          Layout.selfCenter,
        ]}
        onPress={() => openLink('message://')}
      >
        <Text style={[Fonts.textRegular, Fonts.textMedium, Fonts.textBeige100]}>
          {t('signUp.confirm.button')}
        </Text>
      </TouchableOpacity>
    </TitleDetailConatiner>
  )
}

export default EmailConifirmationPage
