import * as React from "react"
import { StyleProp, Text, TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import Ionicons from "react-native-vector-icons/Ionicons"

export interface ButtonDownloadProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?
}

/**
 * Describe your component here
 */
export const ButtonDownload = React.memo(
  observer(function ButtonDownload(props: ButtonDownloadProps) {
    const { onPress } = props

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.btn}>
          <Ionicons name="download" size={16} color={"red"} />
          <Text style={{ color: "red", fontWeight: "bold" }}> Download</Text>
        </View>
      </TouchableOpacity>
    )
  }),
)

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    height: 28,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
})
