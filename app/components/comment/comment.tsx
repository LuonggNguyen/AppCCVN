import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet, Image, Text } from "react-native"
import { observer } from "mobx-react-lite"
import Ionicons from "react-native-vector-icons/Ionicons"

export interface CommentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  img?: string
  name?: string
  content?: string
  rating?: number
}

/**
 * Describe your component here
 */
export const Comment = observer(function Comment(props: CommentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image source={{ uri: props.img }} style={styles.imgUser} />
        <Text style={styles.nameUser}>{props.name}</Text>
      </View>
      <View style={styles.comment}>
        <Text numberOfLines={5}>{props.content}</Text>
        <Text style={{ color: "#000", marginTop: 4 }}>
          Rate: {props.rating}/10 <Ionicons name="star" color={"gold"} size={20} />
        </Text>
      </View>
      <View style={{ height: 0.5, backgroundColor: "#000", width: "100%" }} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {},
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginVertical: 4,
  },
  imgUser: {
    resizeMode: "contain",
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  nameUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 12,
  },
  roleUser: {
    fontSize: 12,
    padding: 4,
  },
  comment: {
    margin: 8,
  },
})
