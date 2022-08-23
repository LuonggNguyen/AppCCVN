import * as React from "react"
import { Image, StyleProp, Text, View, ViewStyle, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite"



export interface ItemCastProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  img?:string
  name?:string
  role?:string
}

/**
 * Describe your component here
 */
export const ItemCast = observer(function ItemCast(props: ItemCastProps) {


  return (
    <View style = {styles.container}>
        <Image source={{uri:props.img}} style = {styles.imgCast}/>
        <View style = {{marginHorizontal:8}}>
          <Text style = {styles.nameCast}>{props.name}</Text>
          <Text style = {styles.roleCast}>{props.role}</Text>
        </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center'
  },
  imgCast:{
    resizeMode:'contain',
    height:40,
    width:40,
    borderRadius:20
  },
  nameCast:{
    fontSize:12,
    fontWeight:'normal',
    color:'#000',
    padding:4
  },
  roleCast:{
    fontSize:12,
    padding:4
  }
})
