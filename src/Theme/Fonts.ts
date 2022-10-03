/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { ThemeVariables } from './theme'

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    textExtraSmall: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    textSmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    textSmall500: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    textNormal: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    textNormal500: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textMedium: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24,
    },
    textMedium24: {
      fontSize: 24,
      fontWeight: '500',
      lineHeight: 32,
    },
    textLarge: {
      fontSize: 32,
      fontWeight: '500',
    },
    titleSmall: {
      fontSize: 11,
      fontWeight: '400',
      color: Colors.primary,
      // lineHeight: 16,
      letterSpacing: -1,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
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
    textWhite: {
      color: Colors.white,
    },
    textBeige100: {
      color: Colors.beige_100,
    },
    textBeige200: {
      color: Colors.beige_200,
    },
    textGrey100: {
      color: Colors.grey_100,
    },
    textPrimary: {
      color: Colors.primary,
    },
    textError: {
      color: Colors.error,
    },
  })
}
