import { View, Text, ViewProps } from 'react-native'
import { ReactNode } from 'react'

type FullHeightWrapperProps = { bgColor?: string } & ViewProps;
export default function FullHeightWrapper(props: FullHeightWrapperProps) {
  	const { children, bgColor, ...restProps } = props;
  	return (
    	<View style={{backgroundColor: bgColor}} {...restProps}>
        	{children}
    	</View>
  	)
}