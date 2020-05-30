import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import * as colors from '../../configs/colors';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

const Movies = ({movie}) => {
   const navigation = useNavigation();
   const posterUrl = `${Config.API_IMAGE}${movie.poster_path}`;

   const handlerMovieRecomendations = async () => {
      await Axios.get(
         `${Config.API_URL}/${Config.API_VERSION}/movie/${movie.id}/recommendations?api_key=${Config.API_TOKEN}&language=es-AR&page=1`,
      ).then(res => navigation.navigate('MovieScreen', {movieRecomended: res.data.results}));
   }

   return (
      <TouchableOpacity onPress={handlerMovieRecomendations}>
         <View style={styles.container}>
            <Image
               style={styles.imageContainer}
               resizeMethod={'auto'}
               resizeMode={'contain'}
               source={{uri: posterUrl}}
            />
            <View style={styles.movieContainer}>
               <Text style={styles.movieTitle}>{movie.original_title}</Text>
               <Text style={styles.movieVote}>{movie.vote_average}</Text>
            </View>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      width: 190,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   imageContainer: {width: 175, height: 260, borderRadius: 3, top: '2%'},
   movieContainer: {position: 'absolute', bottom: '6.5%', width: '92%'},
   movieTitle: {
      color: colors.white,
      fontSize: 20,
      fontWeight: '700',
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
      flexWrap: 'wrap',
   },
   movieVote: {
      color: colors.white,
      width: '100%',
      backgroundColor: 'rgba(248,112,96, 0.7)',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '600',
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
   },
});

export default Movies;
