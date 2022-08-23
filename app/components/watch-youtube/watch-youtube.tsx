import * as React from "react"
import { StyleProp, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import YouTube from "react-native-youtube"

export interface WatchYoutubeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const WatchYoutube = observer(function WatchYoutube(props: WatchYoutubeProps) {
  return <YouTube style={styles.youtube} apiKey="QYpDQxHfTPk" videoId="QYpDQxHfTPk" />
})
const styles = StyleSheet.create({
  youtube: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
})
