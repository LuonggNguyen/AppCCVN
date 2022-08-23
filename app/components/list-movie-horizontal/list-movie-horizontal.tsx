import * as React from "react"
import { StyleProp, View, ViewStyle, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite"



export interface ListMovieHorizontalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  category?:string
  clickCategory?

}

/**
 * Describe your component here
 */
export const ListMovieHorizontal = observer(function ListMovieHorizontal(props: ListMovieHorizontalProps) {

  return (
        <View style ={styles.category}>
            <Text style ={styles.nameCategory}>{props.category}</Text>
            <TouchableOpacity onPress={props.clickCategory}>
                <Text style ={styles.seeAll}>See all</Text>
            </TouchableOpacity>
        </View>
  )
})

const styles = StyleSheet.create({
  category:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginHorizontal:12,
      marginVertical:12
  },
  nameCategory:{
      fontSize:15,
      fontWeight:'bold',
      color:'#000',
  },
  seeAll:{
      fontSize:12,
      fontWeight:'bold',
      color:'red',
  }
})
