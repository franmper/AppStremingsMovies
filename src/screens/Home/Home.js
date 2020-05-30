import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Axios from 'axios';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import * as colors from '../../configs/colors';
import Config from 'react-native-config';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Movies from '../Movies/Movies';
import Series from '../Series/Series';

const Home = ({navigation}) => {
   const [movieRecomendations, setMovieRecomendations] = React.useState([]);
   const [tvRecomendations, setTvRecomendations] = React.useState([]);

   React.useEffect(() => {
      getMovieRecomendations();
      getTvRecomendations();
   }, []);

   const getMovieRecomendations = async () => {
      await Axios.get(
         `${Config.API_URL}/${Config.API_VERSION}/trending/movie/week?api_key=${Config.API_TOKEN}`,
      ).then(res => setMovieRecomendations(res.data.results));
   };

   const getTvRecomendations = async () => {
      await Axios.get(
         `${Config.API_URL}/${Config.API_VERSION}/trending/tv/week?api_key=${Config.API_TOKEN}`,
      ).then(res => setTvRecomendations(res.data.results));
   };

   const handlerMovieRecomendations = async () => {
      const moviesIds = [];
      movieRecomendations.forEach(movie => moviesIds.push(movie.id));
      const movieIdForRecomendation = moviesIds[Math.floor(Math.random() * moviesIds.length)]
      console.log(movieIdForRecomendation)
      await Axios.get(
         `${Config.API_URL}/${Config.API_VERSION}/movie/${movieIdForRecomendation}/recommendations?api_key=${Config.API_TOKEN}&language=es-AR&page=1`,
      ).then(res => navigation.navigate('MovieScreen', {movieRecomended: res.data.results}));
   }

   const handlerTvRecomendations = async () => {
      const tvIds= [];
      tvRecomendations.forEach(tv => tvIds.push(tv.id));
      const tvIdForRecomendation = tvIds[Math.floor(Math.random() * tvIds.length)]
      console.log(tvIdForRecomendation)
      await Axios.get(
         `${Config.API_URL}/${Config.API_VERSION}/tv/${tvIdForRecomendation}/recommendations?api_key=${Config.API_TOKEN}&language=es-AR&page=1`,
      ).then(res => navigation.navigate('SerieScreen', {serieRecomended: res.data.results}));
   }

   return (
      <>
         <View style={styles.statusBar}></View>
         <View style={styles.container}>
            <View style={styles.titleContainer}>
               <Text style={styles.title}>RECOMENDACIONES</Text>
            </View>
            <View style={styles.movieContainer}>
               <Text style={styles.movieTitle}>
                  Peliculas recomendadas de la semana
               </Text>
               <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  alwaysBounceHorizontal={true}>
                  {movieRecomendations.map(movie => {
                     return <Movies key={movie.id} movie={movie} navigation={navigation} />;
                  })}
               </ScrollView>
            </View>
            <View style={styles.tvContainer}>
               <Text style={styles.tvTitle}>
                  Series recomendadas de la semana
               </Text>
               <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  alwaysBounceHorizontal={true}>
                  {tvRecomendations.map(tv => {
                     return <Series key={tv.id} tv={tv} navigation={navigation} />;
                  })}
               </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
               <TouchableOpacity onPress={handlerMovieRecomendations} style={[styles.button, {backgroundColor: colors.radicalRed}]}>
                  <Text style={styles.buttonText}>UNA PELICULA</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={handlerTvRecomendations} style={[styles.button, {backgroundColor: colors.blueRyb}]}>
                  <Text style={styles.buttonText}>UNA SERIE</Text>
               </TouchableOpacity>
            </View>
         </View>
      </>
   );
};

export default Home;

const styles = StyleSheet.create({
   container: {height: '100%', backgroundColor: colors.midnigthBlue},
   statusBar: {
      height: getStatusBarHeight({skipAndroid: true}),
      backgroundColor: colors.midnigthBlue,
   },
   titleContainer: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 3,
      borderBottomColor: colors.bitterSweet,
   },
   title: {color: colors.white, fontSize: 25, fontWeight: 'bold'},
   recoTitleContainer: {
      height: 50,
      paddingLeft: 20,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.bitterSweet,
      marginBottom: 5,
   },
   recoTitle: {
      fontSize: 20,
      alignSelf: 'center',
      color: colors.white,
      fontWeight: '500',
   },
   movieContainer: {
      height: '40%',
      marginVertical: 10,
   },
   movieTitle: {
      marginLeft: 15,
      fontSize: 20,
      color: colors.white,
      fontWeight: '600',
      marginBottom: 10,
   },
   tvContainer: {
      height: '40%',
   },
   tvTitle: {
      marginLeft: 15,
      fontSize: 20,
      color: colors.white,
      fontWeight: '600',
      marginBottom: 10,
   },
   buttonContainer: {
      height: 50,
      width: "100%",
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
   },
   button: {
      height: 40,
      width: 150,
      alignSelf: "center",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold"
   }
});
