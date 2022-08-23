/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { LoginScreen } from "../screens/login/login-screen"
import { HomeScreen } from "../screens/home/home-screen"
import { SignupScreen } from "../screens/signup/signup-screen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ProfileScreen, Top10MovieScreen, WatchVideoScreen } from "../screens"
import { DiscoverScreen } from "../screens/discover/discover-screen"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { NewReleasesScreen } from "../screens/new-releases/new-releases-screen"
import { DetailsMovieScreen } from "../screens/details-movie/details-movie-screen"
import { SearchMovieScreen } from "../screens/search-movie/search-movie-screen"
import SplashScreen from "react-native-splash-screen"
import { useStores } from "../models"
import auth from "@react-native-firebase/auth"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  login: undefined
  signup: undefined
  index: undefined
  discover: undefined
  top10: { nameH: string }
  newReleases: { nameH: string }
  detailsMovie: { id: string }
  searchMovie: undefined
  splash: undefined
  watchVideo: { uri: string }
  // 🔥 Your screens go here
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  const Tab = createBottomTabNavigator()

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Discover") {
              iconName = focused ? "ios-tv" : "ios-tv-outline"
            } else if (route.name === "Profile") {
              iconName = focused ? "account-circle" : "account-circle-outline"
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />
            }
            return <Ionicons name={iconName} size={size} color={color} />

            // You can return any component that you like here!
          },
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: "#f1f1f1",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
  }

  const [user] = useState(auth().currentUser)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={!user ? "login" : "index"}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="top10" component={Top10MovieScreen} />
      <Stack.Screen name="newReleases" component={NewReleasesScreen} />
      <Stack.Screen name="detailsMovie" component={DetailsMovieScreen} />
      <Stack.Screen name="searchMovie" component={SearchMovieScreen} />
      <Stack.Screen name="watchVideo" component={WatchVideoScreen} />
      <Stack.Screen name="index" component={MyTabs} />

      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const { discoverMovieStore, genreStore, newMovieStore, topMovieStore } = useStores()
  const { discoverMovies } = discoverMovieStore
  const { topMovies } = topMovieStore
  const { newMovies } = newMovieStore
  const { genres } = genreStore
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  const loadApp = async () => {
    // if (!discoverMovies || !topMovies || !newMovies || !genres) {
    await Promise.all([
      discoverMovieStore.getDiscoverMovies(),
      topMovieStore.getTopMovies(),
      newMovieStore.getNewMovies(),
      genreStore.getGenres(),
    ])
    // } else {
    console.log("Done loading")
    // }
  }
  useEffect(() => {
    loadApp().finally(SplashScreen.hide)
    return () => {}
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
