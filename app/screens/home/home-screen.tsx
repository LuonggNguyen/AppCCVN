import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  ViewStyle,
  View,
  Text,
  TextStyle,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { spacing } from "../../theme"
import { ButtonPlay } from "../../components/button-play/button-play"
import { Header } from "../../components/header/header"
import { ListMovieHorizontal } from "../../components/list-movie-horizontal/list-movie-horizontal"
import ItemMovie from "../../components/item-movie/item-movie"
import { BannerMovie } from "../../components/banner-movie/banner-movie"
import { useStores } from "../../models/root-store/root-store-context"
import { firebase } from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

const ROOT: ViewStyle = {
  flex: 1,
}
const TOP: ViewStyle = {
  justifyContent: "space-between",
  height: "50%",
  width: "100%",
  flex: 1,
}
const ABOUT_MOVIE: ViewStyle = {
  marginVertical: spacing[2],
  marginHorizontal: spacing[2],
}
const NAME_MOVIE: TextStyle = {
  color: "#fff",
  fontSize: 24,
  fontWeight: "bold",
  textShadowColor: "#000",
  textShadowOffset: { width: 5, height: 5 },
  textShadowRadius: 12,
}
const TYPE_MOVIE: TextStyle = {
  color: "#fff",
  fontSize: 12,
  textShadowColor: "#000",
  textShadowOffset: { width: 5, height: 5 },
  textShadowRadius: 12,
}
const BOTTOM: ViewStyle = {
  alignItems: "center",
  flex: 1,
}
const LISTH: ViewStyle = {
  height: Dimensions.get("screen").height * 0.28,
  width: "100%",
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList>> = observer(function HomeScreen({
  navigation,
}) {
  const { topMovieStore, newMovieStore, genreStore } = useStores()
  const { topMovies } = topMovieStore
  const { newMovies } = newMovieStore
  const { genres } = genreStore

  const leftFunc = () => {
    Alert.alert("Logout Account", "Do you logout account ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => {
          GoogleSignin.signOut() &&
            firebase
              .auth()
              .signOut()
              .then(
                function () {
                  console.log("Signout Succesfull")
                },
                function (error) {
                  console.log("Signout Failed")
                },
              )
          navigation.navigate("login")
        },
      },
    ])
  }
  const searchMovie = () => {
    navigation.navigate("searchMovie")
  }

  const goToTop10 = () => {
    navigation.navigate("top10", { nameH: "Top 10 Movie This Week" })
  }
  const goToTopNewReleases = () => {
    navigation.navigate("newReleases", { nameH: "New Releases" })
  }
  const goToDetailById = (id) => {
    navigation.navigate("detailsMovie", { id: id })
  }
  const [ran, setRan] = useState(1)
  useEffect(() => {
    const id = setInterval(() => {
      setRan(Math.floor(Math.random() * 20))
    }, 3000)
    return () => clearInterval(id)
  }, [ran])
  if (!topMovies?.length || !genres?.length || !newMovies?.length) return null

  const listGenre = topMovies?.[ran]?.genre_ids?.map((item) => {
    var genre = genres?.find((it) => it.id === item)
    return genre.name
  })
  return (
    <View style={ROOT}>
      <View style={TOP}>
        <Header
          color="#fff"
          iconLeft="arrow-back"
          iconRight="ios-search-outline"
          leftFunc={leftFunc}
          rightFunc={searchMovie}
        />
        <BannerMovie urlImage={"https://image.tmdb.org/t/p/w500" + topMovies[ran].poster_path} />
        <View style={ABOUT_MOVIE}>
          <Text style={NAME_MOVIE}>{topMovies[ran].title}</Text>
          <Text style={TYPE_MOVIE}>{listGenre.join(", ")}</Text>
          <ButtonPlay
            onPress={() => {
              goToDetailById(topMovies[ran].id)
            }}
          />
        </View>
      </View>
      <View style={BOTTOM}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <SafeAreaView style={LISTH}>
            <ListMovieHorizontal clickCategory={goToTop10} category="Top 10 Movie This Week" />
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 12 }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => {
                return (
                  <ItemMovie
                    widthItem={0.28}
                    img={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                    soccer={item.vote_average}
                    onPress={() => {
                      goToDetailById(item.id)
                    }}
                  />
                )
              }}
              keyExtractor={(item) => item.id.toString()}
              data={topMovies}
            />
          </SafeAreaView>
          <SafeAreaView style={LISTH}>
            <ListMovieHorizontal clickCategory={goToTopNewReleases} category="New Releases" />
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 12 }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => {
                return (
                  <ItemMovie
                    widthItem={0.28}
                    img={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                    soccer={item.vote_average}
                    onPress={() => {
                      goToDetailById(item.id)
                    }}
                  />
                )
              }}
              keyExtractor={(item) => item.id.toString()}
              data={newMovies}
            />
          </SafeAreaView>
          <View style={{ height: 20 }}></View>
        </ScrollView>
      </View>
    </View>
  )
})
