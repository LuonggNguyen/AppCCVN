import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"
import auth from "@react-native-firebase/auth"
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { ButtonAuthentication } from "../../components/button-authentication/button-authentication"
import { TextHeader } from "../../components/text-header/text-header"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const HEADER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginVertical: spacing[2],
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const FOOTER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: spacing[2],
  justifyContent: "center",
}
const TEXT_INPUT: ViewStyle = {
  width: "90%",
  height: 48,
  borderWidth: 1,
  borderRadius: 10,
  borderColor: "#999",
  marginVertical: spacing[2],
}

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(
  function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function onGoogleButtonPress() {
      try {
        await GoogleSignin.configure({
          webClientId: "72958083262-06927k9u2lfe8ic9v6c8e6cqf37orsa1.apps.googleusercontent.com",
        })
        const { idToken } = await GoogleSignin.signIn()
        const googleCredential = await auth.GoogleAuthProvider.credential(idToken)
        return auth()
          .signInWithCredential(googleCredential)
          .then((userCredentials) => {
            const user = userCredentials.user
            navigation.navigate("index")
            navigation.reset({
              index: 0,
              routes: [{ name: "index" }],
            })
            console.log("Login Successful !! \n Hello " + user.email)
          })
          .catch((err) => {
            console.log("Login Fail !!\n" + err)
          })
      } catch (e) {
        console.error(e)
      }
    }
    const handleLogin = () => {
      if (!email || !password) {
        console.log("Can't be empty")
      } else {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            const user = userCredentials.user
            navigation.navigate("index")
            console.log("Login Successful !! \n Hello " + user.email)
            setEmail("")
            setPassword("")
            navigation.reset({
              index: 0,
              routes: [{ name: "index" }],
            })
          })
          .catch((err) => {
            console.log("Login Fail !!\n" + err)
          })
      }
    }
    return (
      <View style={ROOT}>
        <View style={HEADER}>
          <TextHeader title="Login" />
        </View>

        <View style={CONTAINER}>
          <TextInput
            style={TEXT_INPUT}
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            style={TEXT_INPUT}
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={(p) => setPassword(p)}
          />
          <ButtonAuthentication onPress={handleLogin} title="Login" />
          <GoogleSigninButton
            style={{ marginTop: 50, height: 48, width: "80%" }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => onGoogleButtonPress().then(() => console.log("Signed in with Google!"))}
          />
        </View>

        <View style={FOOTER}>
          <Text style={{ color: "#000", fontSize: 16 }}>Don't have an account ?? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
)
