import React, { useEffect, useRef, useState } from 'react'
import {
  Platform,
  TextInput,
  TextStyle,
  TouchableOpacity as TouchableOpacityAndroid,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { TouchableOpacity as TouchableOpacityIOS } from 'react-native-gesture-handler'
import Search from '@/Assets/Images/svg/search_icon.svg'
import Close from '@/Assets/Images/svg/close.svg'
import { Dim } from '@/helpers/Dim'

interface SearchBoxProps {
  value: string
  placeholder: string
  onChangeText: (text: string) => void
  autoFocus?: boolean
  style?: { container?: ViewStyle[]; text?: TextStyle; shadow?: ViewStyle }
  // When set, it makes the searchbar behave like a button
  onPress?: () => void
  onFocus?: () => void
}

const SearchBar = (props: SearchBoxProps) => {
  const searchViewRef = useRef<TextInput>(null)
  const { Fonts, Colors, Common, Layout, Gutters } = useTheme()
  const [isFocused, setIsFocused] = useState<Boolean>(false)
  // On Android, TouchableOpacity from react-native-gesture-handler only registers a tap when tapping on the background
  // On iOS we have the same issue with the one from react-native
  const TouchableOpacity =
    Platform.OS === 'ios' ? TouchableOpacityIOS : TouchableOpacityAndroid
  if (Platform.OS === 'android') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (props.autoFocus !== undefined && props.autoFocus) {
        setTimeout(function () {
          searchViewRef.current?.focus()
        }, 100)
      }
    }, [props.autoFocus])
  }
  const handleFocus = () => {
    props.onFocus && props?.onFocus()
    setIsFocused(true)
  }
  const handleBlur = () => setIsFocused(false)
  const leftIcon = (
    <Search
      width={Dim.getHorizontalDimension(24)}
      height={Dim.getHorizontalDimension(24)}
      fill={isFocused ? Colors.primary : Colors.grey_200}
    />
  )
  const rightIcon = (
    <TouchableOpacity onPress={() => props.onChangeText('')}>
      <Close
        width={Dim.getHorizontalDimension(24)}
        height={Dim.getHorizontalDimension(24)}
        fill={Colors.primary}
      />
    </TouchableOpacity>
  )
  return (
    <View
      style={[
        Common.textInputContainer,
        Layout.rowHCenter,
        Layout.justifyContentAround,
        Common.roundedInputContainer,
        isFocused && Common.borderFocus,
        props.style && props.style?.container,
      ]}
    >
      {leftIcon}
      <TextInput
        ref={searchViewRef}
        style={[
          Fonts.textPrimary,
          props.style?.text,
          Layout.scrollSpaceBetween,
          Gutters.smallLMargin,
        ]}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.grey_100}
        onChangeText={val => props.onChangeText(val)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!props.onPress}
        autoFocus={Platform.OS === 'ios' ? props.autoFocus ?? false : false}
      />
      {isFocused && rightIcon}
    </View>
  )
}
export default SearchBar
