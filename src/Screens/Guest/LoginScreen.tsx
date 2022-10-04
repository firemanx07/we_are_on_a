import React, { useState } from 'react'
import BackgroundImageContainer from '@/Containers/BackgroundImageContainer'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Dim } from '@/helpers/Dim'
import { navigate } from '@/Navigators/utils'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Pages } from '@/enums/Pages'
import TextInputField from '@/Components/TextInputField'
import { handleValidEmail } from '@/helpers/validators'
import CloseHeader from '@/Components/CloseHeader'

const LoginScreen = () => {
  const { Images, Colors, Layout, Gutters, Fonts, Common } = useTheme()
  const { t } = useTranslation()
  const { dismissAll } = useBottomSheetModal()
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const handleSubmit = () => {
    let isValidEmail = handleValidEmail(email)
    isValidEmail
      ? navigate(Pages.ConfirmLinkPage, { email })
      : setEmailError(!isValidEmail)
  }
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
  useFocusEffect(() => {
    dismissAll()
  })
  return (
    <BackgroundImageContainer source={Images.register.background}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={Layout.grow}
      >
        <LinearGradient
          style={[Layout.fill, Layout.colVCenter, Layout.justifyContentAround]}
          colors={[
            Colors.primary + '80',
            Colors.primary + '80',
            Colors.primary + 'F2',
          ]}
        >
          <CloseHeader />

          <View style={[Layout.fullWidth, Layout.center]}>
            <Text style={[Fonts.textWhite, Fonts.textLarge, Fonts.textCenter]}>
              {t('login.title')}
            </Text>
          </View>
          <View />
          <View />

          <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={'padding'}
            style={[Layout.colVCenter]}
          >
            <TextInputField
              onChangeText={val => {
                setEmail(val)
              }}
              onBlur={() => {
                setEmailError(!handleValidEmail(email))
              }}
              placeholder={t('signUp.form.email.placeholder')}
              value={email}
              textContentType={'emailAddress'}
              returnKeyType={'done'}
              autoComplete={'email'}
              isError={emailError}
              errorMessage={t('signUp.form.email.error')}
              errorTextStyle={Fonts.textBeige100}
              autoFocus
            />
            <TouchableOpacity
              style={[
                Common.button.rounded,
                Gutters.regularBMargin,
                Gutters.regularTMargin,
                Common.roundedInputContainer,
                {
                  minHeight: Dim.getDimension(48),
                },
              ]}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  Fonts.textRegular,
                  Fonts.textMedium,
                  Fonts.textBeige100,
                ]}
              >
                {t('login.button')}
              </Text>
            </TouchableOpacity>

            <View style={[Layout.rowCenter, Gutters.largeTMargin]}>
              <Text
                style={[Fonts.textWhite, Fonts.textCenter, Fonts.textNormal500]}
              >
                {t('login.signupMessage')}
              </Text>
              <TouchableOpacity onPress={() => navigate(Pages.Register, {})}>
                <Text
                  style={[
                    Fonts.textBrown,
                    Fonts.textCenter,
                    Fonts.textNormal500,
                    Gutters.tinyLMargin,
                  ]}
                >
                  {t('login.signupButton')}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ScrollView>
    </BackgroundImageContainer>
  )
}

export default LoginScreen
