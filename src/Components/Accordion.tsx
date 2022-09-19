import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native'
import React, { useState } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import SvgAdd from '@/Assets/images/svg/add.svg'
import { Dim } from '@/helpers/Dim'
import { Colors } from '@/Theme/Variables'

type PossibleChildren = JSX.Element | JSX.Element[] | undefined | boolean
type Children = PossibleChildren | PossibleChildren[]

export interface AccordionProps {
  headerContainerStyle?: ViewStyle
  bodyContainerStyle?: ViewStyle
  style?: ViewStyle
  header: string
  children: Children
  footer?: Children
}

export default function Accordion(props: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const style = getStyle(props, isOpen)
  return (
    <>
      <Collapse style={style.container} onToggle={() => setIsOpen(!isOpen)}>
        <CollapseHeader style={style.headerContainer}>
          <View style={style.headerContainer}>
            <View style={style.headerTextContainer}>
              <Text style={style.headerText}>{props.header}</Text>
            </View>
            <SvgAdd
              width={Dim.getDimension(28)}
              height={Dim.getDimension(28)}
              style={style.arrow}
            />
          </View>
        </CollapseHeader>
        <CollapseBody style={style.bodyContainer}>
          {props.children}
        </CollapseBody>
      </Collapse>
      {isOpen && props.footer}
    </>
  )
}

function getStyle(props: AccordionProps, isOpen: boolean) {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      width: '100%',
      paddingHorizontal: Dim.getDimension(16),
      ...props.style,
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      paddingVertical: Dim.getDimension(3),
      ...props.headerContainerStyle,
    },
    headerTextContainer: {
      flex: 1,
    },
    headerText: {
      // fontFamily: Fonts.AvenirNext_Medium,
      // fontSize: FontSize.Font16,
      color: Colors.primary,
      textAlign: 'left',
    },
    arrow: {
      transform: [{ rotateX: isOpen ? '0deg' : '180deg' }],
    },
    bodyContainer: {
      alignItems: 'center',
      marginTop: Dim.getDimension(10),
      ...props.bodyContainerStyle,
    },
  })
}
