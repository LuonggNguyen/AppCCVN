import * as React from "react"
import { StyleProp, Text, TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import Ionicons from "react-native-vector-icons/Ionicons"

export interface ButtonPlayProps {
  style?: StyleProp<ViewStyle>
  onPress?
}

/**
 * Describe your component here
 */
export const ButtonPlay = React.memo(
  observer(function ButtonPlay(props: ButtonPlayProps) {
    const { onPress } = props

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.btn}>
          <Ionicons name="play" size={16} color={"#fff"} />
          <Text style={{ color: "#fff", fontWeight: "bold" }}> Play</Text>
        </View>
      </TouchableOpacity>
    )
  }),
)

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    backgroundColor: "red",
    borderRadius: 20,
    height: 28,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
})
