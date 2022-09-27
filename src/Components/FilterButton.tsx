import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import Counter from '@/Components/Counter'

type FilterProps = {
  onPress?: () => void
  text?: string
  counter?: number
  isSelected?: boolean
  Icon?: React.ElementType
}
const FilterButton = ({
  onPress,
  text,
  counter,
  isSelected,
  Icon,
}: FilterProps) => {
  const { Colors, Layout, Fonts, Common, Gutters } = useTheme()
  const styles = StyleSheet.create({
    outlineStyle: {
      backgroundColor: Colors.beige_100,
      paddingHorizontal: Dim.getHorizontalDimension(16),
      borderRadius: Dim.getHorizontalDimension(56),
      borderWidth: 2,
      borderColor: Colors.beige_300,
    },
    selectedStyle: {
      backgroundColor: Colors.brown,
      paddingHorizontal: Dim.getHorizontalDimension(16),
      borderRadius: Dim.getHorizontalDimension(56),
    },
  })
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          Layout.rowCenter,
          Layout.justifyContentBetween,
          styles[isSelected ? 'selectedStyle' : 'outlineStyle'],
        ]}
      >
        {Icon && <Icon fill={isSelected ? Colors.beige_100 : Colors.primary} />}
        {!!text && (
          <Text
            style={[
              Fonts.textNormal500,
              Fonts[isSelected ? 'textBeige100' : 'textPrimary'],
            ]}
          >
            {text}
          </Text>
        )}
        {!!counter && (
          <Counter
            styles={
              isSelected && [
                Common.borderBeige_100,
                Fonts.textBeige100,
                Gutters.tinyLMargin,
              ]
            }
            num={counter}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}
export default FilterButton
