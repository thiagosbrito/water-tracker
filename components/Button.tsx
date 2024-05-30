import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'

type ButtonProps = {buttonStyle: any, textStyle: any, icon?: any} & TouchableOpacityProps;
export default function Button(props: ButtonProps) {

    const { children, icon, buttonStyle, textStyle, ...restProps } = props;
    const Icon = icon;
    return (
        <TouchableOpacity className={buttonStyle} {...restProps}>
            {icon && <Icon />}
            <Text className={textStyle}>{children}</Text>
        </TouchableOpacity>
    )
}