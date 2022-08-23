import * as React from "react"
import { Image, StyleProp, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"

export interface BannerMovieProps {
  style?: StyleProp<ViewStyle>
  urlImage?: string
}

export const BannerMovie = React.memo(
  observer(function BannerMovie(props: BannerMovieProps) {
    return <Image style={styles.img} source={{ uri: props.urlImage }} />
  }),
)

const styles = StyleSheet.create({
  img: {
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
})
