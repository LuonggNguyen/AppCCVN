import * as React from "react"
import { Image, StyleProp, Text, View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import Ionicons from "react-native-vector-icons/Ionicons"

export interface ItemMovie2Props {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  img?: string
  name?: string
  vote_count?: number
  vote_average?: number
  onPress?
}

/**
 * Describe your component here
 */
export const ItemMovie2 = observer(function ItemMovie2(props: ItemMovie2Props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.item}>
      <Image style={styles.img} source={{ uri: props.img }} />
      <View style={styles.info}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.time}>
          Vote: {props.vote_count} <Ionicons name="people" color={"brown"} size={16} />
        </Text>
        <View style={styles.viewSize}>
          <Text style={styles.imdb}>IMDb: </Text>
          <Text style={styles.size}> {props.vote_average}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginVertical: 8,
  },
  img: {
    width: "45%",
    height: 130,
    borderRadius: 16,
    resizeMode: "center",
    marginRight: 16,
  },
  info: {
    justifyContent: "space-around",
  },
  name: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    width: "90%",
  },
  time: {
    color: "#000",
  },
  viewSize: {
    flexDirection: "row",
  },
  size: {
    backgroundColor: "#f4cccc",
    borderRadius: 8,
    padding: 4,
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
  },
  imdb: {
    padding: 4,
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
})
