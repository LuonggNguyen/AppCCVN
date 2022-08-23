import * as React from "react"
import { StyleProp, ViewStyle, ScrollView, Text, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons"

export interface AboutMovieProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  overview?: string
  vote_count?: number
  vote_average?: number
  runtime?: number
}

/**
 * Describe your component here
 */
export const AboutMovie = React.memo(
  observer(function AboutMovie(props: AboutMovieProps) {
    return (
      <SafeAreaView style={{ alignItems: "center", marginHorizontal: 8 }} key={3}>
        <ScrollView>
          <Text style={styles.overview}>Overview: {props.overview}</Text>
          <Text style={styles.rate}>
            Rate: {props.vote_average} <Ionicons name="star" color={"gold"} size={20} />
          </Text>
          <Text style={styles.rateCount}>
            Rate count: {props.vote_count} <Ionicons name="people" color={"blue"} size={20} />
          </Text>
          <Text style={styles.time}>
            Run time: {props.runtime} <Ionicons name="time" color={"violet"} size={20} />
          </Text>
        </ScrollView>
      </SafeAreaView>
    )
  }),
)

const styles = StyleSheet.create({
  overview: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  rate: {
    alignSelf: "flex-start",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  rateCount: {
    alignSelf: "flex-start",
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
  },
  time: {
    alignSelf: "flex-start",
    color: "brown",
    fontSize: 20,
    fontWeight: "bold",
  },
})
