import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import { ToggleIcon } from '@/helpers/AnimatedToggle'
import favFill from '@/Assets/Images/svg/favorite_filled.svg'
import favEmpty from '@/Assets/Images/svg/favorite_empty.svg'

type SmallCardProps = {
  source: ImageSourcePropType
  title: string
  subtitle?: string
  hasFavorite?: boolean
}

const SmallCard = ({
  source,
  title,
  subtitle,
  hasFavorite,
}: SmallCardProps) => {
  const { Gutters, Fonts, Common } = useTheme()
  return (
    <View>
      <View>
        <Image
          source={source}
          borderRadius={Dim.getDimension(12)}
          style={{
            width: Dim.getHorizontalDimension(170),
            height: Dim.getDimension(250),
          }}
        />
        {!!hasFavorite && (
          <View style={[Common.posAbs, styles.favoritePos]}>
            <ToggleIcon First={favEmpty} Second={favFill} />
          </View>
        )}
      </View>
      <View style={[Gutters.smallTMargin]}>
        <Text style={[Fonts.textPrimary, Fonts.titleSmall]}>{title}</Text>
        {!!subtitle && <Text>{subtitle}</Text>}
      </View>
    </View>
  )
}
export default SmallCard

const styles = StyleSheet.create({
  favoritePos: {
    top: Dim.getDimension(9),
    right: Dim.getHorizontalDimension(11),
  },
})
