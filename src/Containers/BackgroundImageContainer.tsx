import React from "react";
import {ImageBackground, ImageSourcePropType} from "react-native";
import {useTheme} from "@/Hooks";

type Props = {
    children:React.ReactNode,
    source:ImageSourcePropType,
}

const BackgroundImageContainer =({children,source}:Props)=>{
    const {Layout}=useTheme()
return (
    <ImageBackground style={Layout.fill} resizeMode={"cover"}  {...{children,source}} />
)


}

export default BackgroundImageContainer;
