import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

import auth, { firebase } from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `profile: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="profile" component={ProfileScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ProfileScreen: FC<StackScreenProps<NavigatorParamList, "profile">> = observer(
  function ProfileScreen({ navigation }) {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState(auth().currentUser)

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user)
      if (initializing) setInitializing(false)
    }
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
      GoogleSignin.configure({
        webClientId: "72958083262-06927k9u2lfe8ic9v6c8e6cqf37orsa1.apps.googleusercontent.com",
      })
      return subscriber // unsubscribe on unmount
    }, [])
    if (initializing) return null
    const logout = () => {
      try {
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
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: "https://i.pinimg.com/1200x/fc/eb/df/fcebdf9e34ad5d5f1d8f728f781a00ac.jpg",
          }}
        />
        <View style={styles.top}>
          <Image
            style={{ resizeMode: "cover", height: "100%", width: "100%" }}
            source={{
              uri: "https://img.freepik.com/free-vector/film-strip-background-with-light-effect-vector-illustration_1017-38174.jpg?w=2000",
            }}
          />
        </View>
        <View style={styles.bot}>
          <Text style={styles.welcome}>
            {!user?.displayName ? "Luong Nguyen CCVN" : user.displayName}
          </Text>

          <TouchableOpacity style={styles.btn} onPress={logout}>
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  top: {
    flex: 1,
    width: "100%",
  },
  bot: {
    flex: 2,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    top: 170,
    position: "absolute",
    alignSelf: "center",
    zIndex: 1,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    margin: 32,
  },
  btn: {
    height: 48,
    width: "70%",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
})
