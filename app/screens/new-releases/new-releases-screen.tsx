import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header } from '../../components/header/header';
import ItemMovie from '../../components/item-movie/item-movie';
import { useStores } from '../../models/root-store/root-store-context';

export const NewReleasesScreen: FC<StackScreenProps<NavigatorParamList, "newReleases">> = observer(function NewReleasesScreen({route,navigation}) {
  const { newMovieStore } = useStores()
  const { newMovies } = newMovieStore 

  const goToDetailById = (idMovie) => {
    navigation.navigate('detailsMovie',{id:idMovie})  
  }
  const searchMovie = () => {navigation.navigate('searchMovie')}
  
  const {nameH}:any = route.params
  return (
    <View style = {styles.container}>
      <Header name = {nameH} iconLeft = 'arrow-back-outline' iconRight = 'search' color = '#000'
        leftFunc = {()=>navigation.goBack()}
        rightFunc = {searchMovie}
      />
      <View style = {styles.list}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item}) => {
            return (
                <View style = {styles.item}>
                    <ItemMovie img = {'https://image.tmdb.org/t/p/w500'+item.poster_path} soccer = {item.vote_average} 
                      widthItem = {0.45} onPress = {()=>{goToDetailById(item.id)}}/>    
                </View>) }}
        keyExtractor={item => item.id.toString()}
        data = {newMovies}
    />
      </View>
    </View>
  )
})
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  list:{
    alignItems:'center',
    flex:1,
  },
  item:{
    height:Dimensions.get('screen').height * 0.3,
    marginVertical:4
  }
})
