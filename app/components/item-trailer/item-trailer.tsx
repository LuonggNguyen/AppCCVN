import * as React from "react"
import { StyleProp, View, ViewStyle, TouchableOpacity, Image, Text, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"

export interface ItemTrailerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  img?: string
  name?: string
  quality?: number
  onPress?
}

/**
 * Describe your component here
 */
export const ItemTrailer = React.memo(
  observer(function ItemTrailer(props: ItemTrailerProps) {
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.item}>
        <Image style={styles.img} source={{ uri: props.img }} />
        <View style={styles.info}>
          <Text style={styles.name}>{props.name}</Text>
          <View style={styles.viewSize}>
            <Text style={styles.imdb}>Quality: </Text>
            <Text style={styles.size}> {props.quality}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }),
)

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
    resizeMode: "cover",
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
