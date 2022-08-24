import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { spacing } from "../../theme"
import Ionicons from "react-native-vector-icons/Ionicons"
import { ItemMovie2 } from "../../components/item-movie-2/item-movie-2"
import { useStores } from "../../models/root-store/root-store-context"
import { KEY_API_CONFIG } from "../../services/api/api-config"
import axios from "axios"

export const SearchMovieScreen: FC<StackScreenProps<NavigatorParamList, "searchMovie">> = observer(
  function SearchMovieScreen({ navigation }) {
    const [search, setSearch] = useState("")
    let mv: any = {}
    const [movie, setMovie] = useState<Movie[]>(mv)
    const { topSearchMovieStore } = useStores()
    const { topSearchMovies } = topSearchMovieStore
    useEffect(() => {
      topSearchMovieStore.getTopSearchMovies()
      if (!search) {
        console.log("No query")
      } else {
        axios
          .get(`https://api.themoviedb.org/3/search/movie${KEY_API_CONFIG}&query=${search}`)
          .then((response) => {
            setMovie(response.data.results)
          })
      }
    }, [search])
    const goToDetailById = (id) => {
      navigation.navigate("detailsMovie", { id: id })
    }

    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={28} color="#999" />
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              value={search}
              onChangeText={(e) => setSearch(e.trimStart())}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={28} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.topSearch}>{!search ? "Top Searches" : "Searching"}</Text>

          <View style={{ flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={!search ? [...topSearchMovies] : movie}
              renderItem={({ item }) => {
                return (
                  <ItemMovie2
                    img={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                    name={item.title}
                    vote_count={item.vote_count}
                    vote_average={item.vote_average}
                    onPress={() => goToDetailById(item.id)}
                  />
                )
              }}
            />
          </View>
        </View>
      </View>
    )
  },
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    alignItems: "center",
  },
  searchBar: {
    width: "90%",
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#999",
    marginVertical: spacing[2],
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  textInput: {
    width: "80%",
  },
  content: {
    flex: 1,
    marginHorizontal: 8,
  },
  topSearch: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "flex-start",
  },
})
