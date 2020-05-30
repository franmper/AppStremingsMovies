import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';
import * as colors from '../../configs/colors';
import Axios from 'axios';

const MovieScreen = ({route}) => {
   const [movies, setMovies] = React.useState(route.params.movieRecomended);

   const handlerMovieRecomendations = async id => {
      await Axios.get(
         `${Config.API_URL}/${Config.API_VERSION}/movie/${id}/recommendations?api_key=${Config.API_TOKEN}&language=es-AR&page=1`,
      ).then(res => setMovies(res.data.results));
   };

   return (
      <ScrollView>
         <View>
            <Text style={styles.title}>PELICULAS RECOMENDADAS</Text>
            {movies.map(movie => {
               console.log(movie);
               const backdropUrl = `${Config.API_IMAGE}${movie.backdrop_path}`;
               return (
                  <TouchableOpacity
                     key={movie.id}
                     onPress={() => handlerMovieRecomendations(movie.id)}>
                     <View>
                        <View style={styles.container}></View>
                        <Image
                           source={{uri: backdropUrl}}
                           resizeMethod={'auto'}
                           resizeMode={'cover'}
                           style={styles.imageContainer}
                        />
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                     </View>
                  </TouchableOpacity>
               );
            })}
         </View>
      </ScrollView>
   );
};

export default MovieScreen;

const styles = StyleSheet.create({
   title: {
      width: '100%',
      height: 50,
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      backgroundColor: colors.midnigthBlue,
      color: colors.white,
   },
   container: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      width: '100%',
      height: 200,
      zIndex: 20,
   },
   imageContainer: {height: 200, width: '100%'},
   movieTitle: {
      position: 'absolute',
      bottom: '10%',
      left: '10%',
      textAlign: 'center',
      color: colors.white,
      fontSize: 20,
      fontWeight: '700',
      zIndex: 30,
   },
});
