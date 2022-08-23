import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import WebView from "react-native-webview"

export const WatchVideoScreen: FC<StackScreenProps<NavigatorParamList, "watchVideo">> = observer(
  function WatchVideoScreen({ route, navigation }) {
    const { uri } = route.params
    return <WebView source={{ uri: uri }} />
  },
)
