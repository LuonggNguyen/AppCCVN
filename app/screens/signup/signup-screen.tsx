import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"
import auth from '@react-native-firebase/auth';
import { ButtonAuthentication } from "../../components/button-authentication/button-authentication";
import { TextHeader } from '../../components/text-header/text-header';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const HEADER: ViewStyle = {
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  marginVertical:spacing[2]

}
const  CONTAINER: ViewStyle = {
  flex:1,
  justifyContent:'center',
  alignItems:'center'
}
const FOOTER: ViewStyle = {
  flexDirection:'row',
  alignItems:'center',
  marginVertical:spacing[2],
  justifyContent:'center',
}
const TEXT_INPUT: ViewStyle = {
  width:'90%',
  height:48,
  borderWidth:1,
  borderRadius:10,
  borderColor:'#999',
  marginVertical:spacing[2]
}


export const SignupScreen: FC<StackScreenProps<NavigatorParamList, "signup">> = observer(function SignupScreen({navigation}) {

 const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePass, setRePass] = useState('')


  const handleRegister = () => {
    if(!email || !password || !rePass){
      alert("Can't be empty")
    }else if (password != rePass) {
      alert('Pass and RePass dissimilarity !!')
      setPassword('')
      setRePass('')
    }else{
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }
  
        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }
        console.error(error);
      });
    }
  }
  return (
    <View style = {ROOT}>
      
      <View style = {HEADER}>
        <TextHeader title ='Register'/>
      </View>

      <View style = {CONTAINER}>
        <TextInput style = {TEXT_INPUT} 
          placeholder="Email" value= {email}
          onChangeText = {e => setEmail(e)}
          />
        <TextInput style = {TEXT_INPUT} secureTextEntry
          placeholder="Password" value={password}
          onChangeText = {p => setPassword(p)}
          />
        <TextInput style = {TEXT_INPUT} secureTextEntry
          placeholder="Re-Password" value={rePass}
          onChangeText = {p => setRePass(p)}
          />  
        <ButtonAuthentication onPress={handleRegister}
        title="Register"/>
      </View>

      <View style = {FOOTER}>
        <Text  style = {{color:'#000', fontSize:16}}>Do you already have an account ?? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style = {{color:'#000', fontSize:16,fontWeight:'bold'}}>SignIn</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
})