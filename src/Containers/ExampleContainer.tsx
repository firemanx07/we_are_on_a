import React from 'react'
import { ScrollView, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '@/Hooks'

const ExampleContainer = (props: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  scrollDisabled?: boolean
}) => {
  const { Gutters, Layout } = useTheme()

  return (
    <ScrollView
      style={Layout.fill}
      scrollEnabled={!props.scrollDisabled}
      contentContainerStyle={[
        Layout.fill,
        Layout.column,
        Gutters.smallHPadding,
        props.style,
      ]}
    >
      {props.children}
    </ScrollView>
  )
}

export default ExampleContainer
