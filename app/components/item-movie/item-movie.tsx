import * as React from "react"
import {
  StyleProp,
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native"
import { observer } from "mobx-react-lite"

export interface ItemMovieProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?
  widthItem?: number
  img?: string
  soccer?: number
}

/**
 * Describe your component here
 */
export const ItemMovie = React.memo(
  observer(function ItemMovie(props: ItemMovieProps) {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.container, { width: Dimensions.get("screen").width * props.widthItem }]}
      >
        <Image style={styles.img} source={{ uri: props.img }} />
        <View style={styles.soccer}>
          <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}>
            {props.soccer.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }),
)
export default ItemMovie

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginHorizontal: 4,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    borderRadius: 12,
  },
  soccer: {
    zIndex: 1,
    backgroundColor: "red",
    borderRadius: 6,
    width: "30%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
})
