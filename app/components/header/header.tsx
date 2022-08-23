import * as React from "react"
import { StyleProp, Text, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { spacing } from '../../theme/spacing';


export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  leftFunc?
  rightFunc?
  iconLeft?:string
  iconRight?:string
  color?:string
  name?:string
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const {leftFunc} = props
  const {rightFunc} = props

  return (
    <View style = {styles.container}>
        <TouchableOpacity onPress={leftFunc}>
        <Ionicons name = {`${props.iconLeft}`} size = {28} color = {props.color}/>
        </TouchableOpacity>
        <Text style = {{fontSize:18,fontWeight:'bold',color:`${props.color}`,}}>{props.name}</Text>
        <TouchableOpacity onPress={rightFunc}>
        <Ionicons name = {`${props.iconRight}`} size = {28} color = {props.color}/>
        </TouchableOpacity>
    </View>
  )
})
const styles = StyleSheet.create({
  container:{
      flexDirection:'row',
      alignItems:'baseline',
      justifyContent:'space-between',
      zIndex:1,
      marginVertical:spacing[2],
      marginHorizontal:spacing[2],
  },
  
})
