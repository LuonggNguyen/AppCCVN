import * as React from "react"
import { StyleProp,ViewStyle, StyleSheet, Text } from 'react-native';
import { observer } from "mobx-react-lite"


export interface TextHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title?:string
}

/**
 * Describe your component here
 */
export const TextHeader = observer(function TextHeader(props: TextHeaderProps) {

  return (
    <Text style = {styles.title}>{props.title}</Text>
  )
})

const styles = StyleSheet.create({
  title:{
      fontSize:24,
      fontWeight:'bold',
      color:'#000',
  }
})
