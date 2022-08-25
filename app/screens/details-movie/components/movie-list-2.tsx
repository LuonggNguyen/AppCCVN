import { FlatList, View, Dimensions, StyleSheet } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import ItemMovie from "../../../components/item-movie/item-movie"

type Props = {
  data: any[]
  onPress?
  setKey?
}

export const MovieList2 = React.memo(
  observer((props: Props) => {
    const navigation = useNavigation()

    const goToDetailById = (id) => {
      props.setKey("")
      navigation.navigate("detailsMovie" as never, { id: id } as never)
    }

    return (
      <FlatList
        {...props}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <ItemMovie
                img={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                soccer={item.vote_average}
                widthItem={0.45}
                onPress={() => {
                  goToDetailById(item.id)
                }}
              />
            </View>
          )
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  }),
)
const styles = StyleSheet.create({
  item: {
    height: Dimensions.get("screen").height * 0.3,
    marginVertical: 4,
  },
})
