import React, { useMemo } from 'react'
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
import { MotiPressable } from 'moti/interactions'
import { Colors } from '@/Theme/Variables'

type SmallCardProps = {
  source: ImageSourcePropType
  title: string
  subtitle?: string
  hasFavorite?: boolean
  onPress?: () => void
}

const SmallCard = ({
  source,
  title,
  subtitle,
  hasFavorite,
  onPress,
}: SmallCardProps) => {
  const { Gutters, Fonts, Common, Colors } = useTheme()
  return (
    <MotiPressable
      onPress={onPress}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              opacity: hovered || pressed ? 0.5 : 1,
            }
          },
        [],
      )}
      transition={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              delay: hovered || pressed ? 0 : 100,
            }
          },
        [],
      )}
    >
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
            <ToggleIcon
              First={favEmpty}
              customFill={{ first: Colors.beige_100 }}
              Second={favFill}
            />
          </View>
        )}
      </View>
      <View style={[Gutters.smallTMargin]}>
        <Text style={[Fonts.textPrimary, Fonts.titleSmall]}>{title}</Text>
        {!!subtitle && <Text>{subtitle}</Text>}
      </View>
    </MotiPressable>
  )
}
export default SmallCard

const styles = StyleSheet.create({
  favoritePos: {
    top: Dim.getDimension(9),
    right: Dim.getHorizontalDimension(11),
  },
})
