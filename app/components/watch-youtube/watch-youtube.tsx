import * as React from "react"
import { StyleProp, ViewStyle, StyleSheet, SafeAreaView } from "react-native"
import { observer } from "mobx-react-lite"
import YoutubePlayer from "react-native-youtube-iframe"
export interface WatchYoutubeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  keyVideo: string
}

/**
 * Describe your component here
 */
export const WatchYoutube = React.memo(
  observer(function WatchYoutube(props: WatchYoutubeProps) {
    const [playing, setPlaying] = React.useState(false)
    const onStateChange = React.useCallback((state) => {
      if (state === "ended") {
        setPlaying(false)
        console.log("video has finished playing!")
      }
    }, [])
    return (
      <SafeAreaView style={styles.youtube}>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={props.keyVideo}
          onChangeState={onStateChange}
        />
      </SafeAreaView>
    )
  }),
)
const styles = StyleSheet.create({
  youtube: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
})
