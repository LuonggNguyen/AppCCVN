import * as React from "react"
import { StyleProp, ViewStyle, TouchableOpacity, Text, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"

export interface ButtonAuthenticationProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title?: string
  onPress?
}

/**
 * Describe your component here
 */
export const ButtonAuthentication = React.memo(
  observer(function ButtonAuthentication(props: ButtonAuthenticationProps) {
    const { onPress } = props

    return (
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
    )
  }),
)

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: "90%",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 24,
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
})
