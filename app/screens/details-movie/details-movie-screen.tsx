import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header } from "../../components/header/header"
import { ItemCast } from "../../components/item-cast/item-cast"
import axios from "axios"
import { KEY_API_CONFIG } from "../../services/api/api-config"
import { AboutMovie } from "../../components/about-movie/about-movie"
import { MovieList } from "./components/movie-list"
import { MovieList2 } from "./components/movie-list-2"
import { WatchYoutube } from "../../components/watch-youtube/watch-youtube"
const ListTab = [
  {
    status: "Trailers",
  },
  {
    status: "More Like This",
  },
  {
    status: "About",
  },
]
const dataTab = [
  {
    tab: "1",
    status: "Trailers",
  },
  {
    tab: "2",
    status: "More Like This",
  },
  {
    tab: "3",
    status: "About",
  },
]

export const DetailsMovieScreen: FC<StackScreenProps<NavigatorParamList, "detailsMovie">> =
  observer(function DetailsMovieScreen({ route, navigation }) {
    const { id } = route.params
    let mv: any = {}
    const [movie, setMovie] = useState<Movie>(mv)
    const [rcmMovie, setRcmMovie] = useState()
    const [cast, setCast] = useState()
    const [trailer, setTrailer] = useState([])
    const [genres, setGenres] = useState([])
    const [key, setKey] = useState()
    const [status, setStatus] = useState("Trailers")
    const [dataList, setDataList] = useState(dataTab.filter((e) => e.status == status))
    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/movie/${id}${KEY_API_CONFIG}`).then((response) => {
        setGenres(response.data.genres)
        setMovie(response.data)
      })
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}/credits${KEY_API_CONFIG}`)
        .then((response) => {
          setCast(response.data.cast)
        })
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}/videos${KEY_API_CONFIG}`)
        .then((response) => {
          setTrailer(response.data.results)
        })
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}/recommendations${KEY_API_CONFIG}`)
        .then((response) => {
          setRcmMovie(response.data.results)
        })
    }, [id])

    const ChangeTab = (status) => {
      if (status != "Trailers") {
        setDataList(dataTab.filter((e) => e.status == status))
      } else {
        setDataList(dataTab.filter((e) => e.status == "Trailers"))
      }
      setStatus(status)
    }
    const listGenre = genres.map((item) => {
      return item.name
    })
    const getTrailer = () => {
      var keyVideo = ""
      trailer.forEach((item) => {
        if (item.type == "Trailer") {
          keyVideo = item.key
        }
      })
      return keyVideo
    }
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Header
            color="#fff"
            iconLeft="arrow-back"
            iconRight="ios-share-outline"
            leftFunc={() => navigation.goBack()}
            rightFunc={() =>
              navigation.navigate("watchVideo", {
                uri: `https://www.youtube.com/watch?v=${!key ? getTrailer() : key}`,
              })
            }
          />
          <WatchYoutube keyVideo={!key ? getTrailer() : key} />
        </View>
        <View style={styles.bot}>
          <View style={styles.info}>
            <Text style={styles.nameMovie}>{movie.title}</Text>
            <Text style={styles.typeMovie}>{listGenre.join(", ")}</Text>
            <SafeAreaView>
              <FlatList
                data={cast}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <ItemCast
                      name={item.name}
                      role={item.known_for_department}
                      img={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    />
                  )
                }}
              />
            </SafeAreaView>
          </View>
          <SafeAreaView style={styles.option}>
            {ListTab.map((item) => (
              <TouchableOpacity key={item.status} onPress={() => ChangeTab(item.status)}>
                <View>
                  <Text style={status == item.status ? styles.tabActive : styles.tab}>
                    {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
          <View style={{ flex: 1 }}>
            {dataList.map((item) => {
              if (item.tab == "1") {
                return <MovieList key={1} data={trailer} setKey={setKey} />
              } else if (item.tab == "2") {
                return (
                  <View style={{ alignItems: "center" }} key={2}>
                    <MovieList2 data={rcmMovie} />
                  </View>
                )
              } else {
                return (
                  <AboutMovie
                    key={3}
                    overview={movie.overview}
                    vote_count={movie.vote_count}
                    vote_average={movie.vote_average}
                    runtime={movie.runtime}
                  />
                )
              }
            })}
          </View>
        </View>
      </View>
    )
  })
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bot: {
    flex: 2.4,
  },
  info: {
    marginHorizontal: 12,
  },
  nameMovie: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  typeMovie: {
    color: "#000",
    fontSize: 16,
    marginBottom: 8,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  tab: {
    alignItems: "center",
  },
  tabActive: {
    alignItems: "center",
    color: "red",
    fontWeight: "bold",
  },
})
