/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ FontSize, Colors }) {
  return StyleSheet.create({
    textSmall: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20
    },
    textSmall500: {
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 20
    },
    textNormal: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24
    },
    textNormal500: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 24
    },
    textMedium: {
      fontSize: 18,
      fontWeight: "500",
      lineHeight: 24
    },
    textMedium24: {
      fontSize: 24,
      fontWeight: "500",
      lineHeight: 32
    },
    textLarge: {
      fontSize: 40,
      fontWeight: "500",
      lineHeight: 48
    },

    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}
