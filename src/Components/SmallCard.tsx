import React, { useMemo } from 'react'
import { ImageRequireSource, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import { ToggleIcon } from '@/helpers/AnimatedToggle'
import favFill from '@/Assets/Images/svg/favorite_filled.svg'
import favEmpty from '@/Assets/Images/svg/favorite_empty.svg'
import { MotiPressable } from 'moti/interactions'
import FastImage from 'react-native-fast-image'

type SmallCardProps = {
  source: ImageRequireSource
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
        <FastImage
          source={source}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: Dim.getHorizontalDimension(170),
            height: Dim.getDimension(300),
            borderRadius: Dim.getDimension(12),
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
export default React.memo(SmallCard)

const styles = StyleSheet.create({
  favoritePos: {
    top: Dim.getDimension(9),
    right: Dim.getHorizontalDimension(11),
  },
})
