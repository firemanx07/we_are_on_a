import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import Counter from '@/Components/Counter'
type ListItemProps = {
  title: string
  counter: number
  distance?: number
}
const ListItem = ({ title, counter, distance }: ListItemProps) => {
  const { Layout, Gutters, Fonts } = useTheme()
  return (
    <View
      style={[
        Layout.row,
        Layout.justifyContentBetween,
        Layout.alignItemsCenter,
        Layout.fullWidth,
      ]}
    >
      <View style={[Layout.row, Layout.alignItemsCenter]}>
        <Text
          style={[
            Fonts.textMedium24,
            Fonts.textPrimary,
            Gutters.tinyRMargin,
            Gutters.tinyBPadding,
          ]}
        >
          {title}
        </Text>
        <Counter num={counter} />
      </View>
      {distance && (
        <Text style={[Fonts.textSmall, Fonts.textGrey100]}>{distance}KM</Text>
      )}
    </View>
  )
}
export default ListItem
