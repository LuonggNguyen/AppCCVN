import { FlatList } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { ItemTrailer } from "../../../components/item-trailer/item-trailer"
import { useNavigation } from "@react-navigation/native"

type Props = {
  data: any[]
  onPress?
}

export const MovieList = React.memo(
  observer((props: Props) => {
    const navigation = useNavigation()

    const watchMovie = (url) => {
      navigation.navigate("watchVideo" as never, { uri: url } as never)
    }

    return (
      <FlatList
        {...props}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemTrailer
            img={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
            name={item.name}
            quality={item.size}
            onPress={() => {
              watchMovie(`https://www.youtube.com/watch?v=${item.key}`)
            }}
          />
        )}
      />
    )
  }),
)
