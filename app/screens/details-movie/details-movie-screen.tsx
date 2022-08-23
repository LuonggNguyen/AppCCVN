import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { BannerMovie } from "../../components/banner-movie/banner-movie"
import { ButtonPlay } from "../../components/button-play/button-play"
import { ButtonDownload } from "../../components/button-download/button-download"
import { Header } from "../../components/header/header"
import { ItemCast } from "../../components/item-cast/item-cast"
import ItemMovie from "../../components/item-movie/item-movie"
import axios from "axios"
import { KEY_API_CONFIG } from "../../services/api/api-config"
import { AboutMovie } from "../../components/about-movie/about-movie"
import { MovieList } from "./components/movie-list"
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
    const [status, setStatus] = useState("Trailers")
    const [dataList, setDataList] = useState(dataTab.filter((e) => e.status == status))
    const { id } = route.params
    let mv: any = {}
    const [movie, setMovie] = useState<Movie>(mv)
    const [rcmMovie, setRcmMovie] = useState()
    const [cast, setCast] = useState()
    const [trailer, setTrailer] = useState([])
    const [genres, setGenres] = useState([])

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

    const goToDetailById = (id) => {
      navigation.navigate("detailsMovie", { id: id })
    }

    const listGenre = genres.map((item) => {
      return item.name
    })
    const uriVideo = trailer.map((item) => {
      return item.key
    })
    const watchMovie = (url) => {
      navigation.navigate("watchVideo", { uri: url })
    }
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Header
            color="#fff"
            iconLeft="arrow-back"
            iconRight="ios-share-outline"
            leftFunc={() => navigation.goBack()}
          />
          <BannerMovie urlImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </View>
        <View style={styles.bot}>
          <View style={styles.info}>
            <Text style={styles.nameMovie}>{movie.title}</Text>
            <Text style={styles.typeMovie}>{listGenre.join(", ")}</Text>
            <View style={styles.menu}>
              <ButtonPlay
                onPress={() => {
                  var rand = uriVideo[Math.floor(Math.random() * uriVideo.length)]
                  watchMovie(`https://www.youtube.com/watch?v=${rand}`)
                }}
              />
              <ButtonDownload />
            </View>
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
                return <MovieList data={trailer} key={1} />
              } else if (item.tab == "2") {
                return (
                  <View style={{ alignItems: "center" }} key={2}>
                    <FlatList
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
                      data={rcmMovie}
                    />
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
    flex: 2,
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
  item: {
    height: Dimensions.get("screen").height * 0.3,
    marginVertical: 4,
  },
})
