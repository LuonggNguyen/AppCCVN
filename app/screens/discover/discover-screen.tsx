import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header } from "../../components/header/header"
import { ItemMovie2 } from "../../components/item-movie-2/item-movie-2"
import { useStores } from "../../models"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import { KEY_API_CONFIG } from "../../services/api/api-config"

export const DiscoverScreen: FC<StackScreenProps<NavigatorParamList, "discover">> = observer(
  function DiscoverScreen({ navigation }) {
    const { discoverMovieStore, genreStore } = useStores()
    const { discoverMovies } = discoverMovieStore
    const { genres } = genreStore
    const [idGenre, setIdGenre] = useState()
    const [movieOfGenre, setMovieOfGenre] = useState()

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie${KEY_API_CONFIG}&sort_by=popularity.desc&page=1&with_genres=${idGenre}&with_watch_monetization_types=flatrate`,
        )
        .then((response) => {
          setMovieOfGenre(response.data.results)
        })

      return () => {}
    }, [idGenre])

    const searchMovie = () => {
      navigation.navigate("searchMovie")
    }
    const goToDetailById = (idMovie) => {
      navigation.navigate("detailsMovie", { id: idMovie })
    }
    const setGenre = (idGenre) => {
      setIdGenre(idGenre)
    }
    return (
      <View style={styles.container}>
        <Header
          iconLeft="star-outline"
          iconRight="ios-search-outline"
          color="#000"
          name="Discover"
          rightFunc={searchMovie}
        />
        <SafeAreaView style={{ height: 48, marginHorizontal: 4 }}>
          <FlatList
            data={genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.itemGenre}
                  onPress={() => {
                    setGenre(item.id)
                  }}
                >
                  <Text style={{ padding: 8, color: "red", fontWeight: "bold" }}>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={!idGenre ? discoverMovies : movieOfGenre}
            keyExtractor={(item) => item.id.toString()}
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
        </SafeAreaView>
      </View>
    )
  },
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemGenre: {
    height: "80%",
    width: 100,
    backgroundColor: "#f4cccc",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
})
