import React, { useState } from 'react'
import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@/Hooks'

type TextProps = TextInputProps & {
  value: string
  placeholder: string
  onChangeText: (text: string) => void
  autoFocus?: boolean
  editable?: boolean
  style?: { container?: ViewStyle; text?: TextStyle; shadow?: ViewStyle }
  onFocus?: () => void
  errorMessage?: string
  isError?: Boolean
}

const TextInputField = (props: TextProps) => {
  const { Fonts, Colors, Common, Layout, Gutters } = useTheme()
  const [isFocused, setIsFocused] = useState<Boolean>(false)
  const handleFocus = () => {
    props.onFocus && props?.onFocus()
    setIsFocused(true)
  }
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    props.onBlur && props.onBlur(e)
    setIsFocused(false)
  }

  return (
    <View style={Layout.colHCenter}>
      <View
        style={[
          Common.textInputContainer,
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Common.roundedInputContainer,
          isFocused && Common.borderFocus,
          props.isError && Common.borderError,
        ]}
      >
        <TextInput
          style={[
            Fonts.textPrimary,
            props.style?.text,
            Layout.fullWidth,
            Gutters.smallLMargin,
            props.isError && Fonts.textError,
          ]}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.grey_100}
          onChangeText={val => props.onChangeText(val)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={props.editable}
          autoFocus={Platform.OS === 'ios' ? props.autoFocus ?? false : false}
          keyboardType={props.keyboardType}
          {...{ props }}
        />
      </View>
      {props.isError && (
        <Text
          style={[
            Fonts.textExtraSmall,
            Fonts.textPrimary,
            Gutters.tinyTMargin,
            Gutters.regularLMargin,
          ]}
        >
          {props.errorMessage}
        </Text>
      )}
    </View>
  )
}
export default TextInputField
