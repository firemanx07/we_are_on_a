//@ts-ignore
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native'
import React, { useState } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import SvgAdd from '@/Assets/Images/svg/add.svg'
import SvgMinus from '@/Assets/Images/svg/minus.svg'
import { Dim } from '@/helpers/Dim'
import { Colors } from '@/Theme/Variables'
import { ToggleIcon } from '@/helpers/AnimatedToggle'

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
    const [isPressed, setIsPressed] = useState<boolean>(false)
    const handleToggle =()=>{
        setIsOpen(!isOpen)
        setIsPressed(true)
    }
    const style = getStyle(props, isOpen)
    return (

            <Collapse  style={[style.container]} onToggle={handleToggle}  isExpanded={isOpen}>
                <CollapseHeader style={style.headerContainer}>
                    <View style={style.headerContainer}>
                        <View style={style.headerTextContainer}>
                            <Text style={style.headerText}>{props.header}</Text>
                        </View>
                <ToggleIcon  First={SvgAdd} Second={SvgMinus} onToggle={()=>setIsOpen(!isOpen)} isToggled={isPressed} resetPress={setIsPressed} />
                    </View>
                </CollapseHeader>
                <CollapseBody style={style.bodyContainer}>
                    {props.children}
                </CollapseBody>
            </Collapse>
            // {/*{isOpen && props.footer}*/}

    )
}

function getStyle(props: AccordionProps, isOpen: boolean) {
    return StyleSheet.create({
        container: {
            width:'100%',
            backgroundColor: Colors.beige_200,
            paddingHorizontal: Dim.getHorizontalDimension(24),
            paddingVertical:Dim.getDimension(10),
            marginBottom:Dim.getDimension(16),
            borderRadius:Dim.getDimension(12),
            ...props.style,
        },
        headerContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            paddingVertical:Dim.getDimension(5),
            ...props.headerContainerStyle,
        },
        headerTextContainer: {
            flex: 1,
        },
        headerText: {
            fontSize: 18,
            fontWeight: '400',
            color: Colors.primary,
            letterSpacing: -1,
            textAlign: 'left',
        },
        arrow: {
            transform: [{ rotateX: isOpen ? '0deg' : '180deg' }],
        },
        bodyContainer: {
            alignItems: 'flex-start',
            marginTop: Dim.getDimension(10),
            ...props.bodyContainerStyle,
        },
    })
}
