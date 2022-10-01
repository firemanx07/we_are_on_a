import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import TitleDetailConatiner from '@/Containers/TitleDetailConatiner'
import TextInputField from '@/Components/TextInputField'
import { Dim } from '@/helpers/Dim'
import AnimatedCheckBox from '@/Components/AnimatedCheckBox'

const SignUpFormScreen = () => {
  const { Layout, Gutters, Fonts, Common } = useTheme()
  const { t } = useTranslation()
  const { dismissAll } = useBottomSheetModal()
  const [fullName, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  useFocusEffect(() => {
    dismissAll()
  })
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  return (
    <TitleDetailConatiner disableScroll title={t('signUp.form.title')}>
      <KeyboardAvoidingView
        behavior={'position'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={[Layout.fill, Layout.column, Gutters.smallHPadding]}
      >
        <View
          style={[
            Layout.fullWidth,
            Layout.column,
            Layout.justifyContentAround,
            { height: Dim.getDimension(110) },
          ]}
        >
          <Text style={[Fonts.textPrimary, Fonts.textMedium]}>
            {t('signUp.form.name.label')}
          </Text>
          <TextInputField
            onChangeText={val => {
              setFullname(val)
            }}
            placeholder={t('signUp.form.name.placeholder')}
            value={fullName}
            autoCapitalize={'words'}
            textContentType={'name'}
            returnKeyType={'next'}
            autoComplete={'name'}
            autoFocus={true}
          />
        </View>
        <View
          style={[
            Layout.fullWidth,
            Layout.column,
            Layout.justifyContentAround,
            { height: Dim.getDimension(110) },
            Gutters.smallBMargin,
          ]}
        >
          <Text style={[Fonts.textPrimary, Fonts.textMedium]}>
            {t('signUp.form.email.label')}
          </Text>
          <TextInputField
            onChangeText={val => {
              setEmail(val)
            }}
            placeholder={t('signUp.form.email.placeholder')}
            value={email}
            autoCapitalize={'words'}
            textContentType={'name'}
            returnKeyType={'next'}
            autoComplete={'name'}
          />
        </View>
        <AnimatedCheckBox label={t('signUp.form.newsLetterLabel')} />

        <TouchableOpacity
          style={[
            Common.button.rounded,
            Common.button.largeButton,
            Gutters.largeTMargin,
            { alignSelf: 'center' },
          ]}
        >
          <Text
            style={[Fonts.textRegular, Fonts.textMedium, Fonts.textBeige100]}
          >
            {t('actions.continue')}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TitleDetailConatiner>
  )
}

export default SignUpFormScreen
