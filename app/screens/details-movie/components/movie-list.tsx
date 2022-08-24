import { FlatList } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { ItemTrailer } from "../../../components/item-trailer/item-trailer"

type Props = {
  data: any[]
  keyVideo?
  setKey?
}

export const MovieList = React.memo(
  observer((props: Props) => {
    return (
      <FlatList
        {...props}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemTrailer
            img={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
            name={item.name}
            quality={item.size}
            onPress={() => props.setKey(item.key)}
          />
        )}
      />
    )
  }),
)
