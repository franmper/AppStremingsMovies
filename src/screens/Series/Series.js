import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import * as colors from '../../configs/colors';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

const Series = ({tv}) => {
   const navigation = useNavigation();
   const posterUrl = `${Config.API_IMAGE}${tv.poster_path}`;

   const handlerTvRecomendations = async () => {
      await Axios.get(
         `${Config.API_URL}/${Config.API_VERSION}/tv/${tv.id}/recommendations?api_key=${Config.API_TOKEN}&language=es-AR&page=1`,
      ).then(res => navigation.navigate('SerieScreen', {serieRecomended: res.data.results}));
   }

   return (
      <TouchableOpacity onPress={handlerTvRecomendations}>
      <View style={styles.container}>
         <Image
            style={styles.imageContainer}
            resizeMethod={'auto'}
            resizeMode={'contain'}
            source={{uri: posterUrl}}
         />
         <View style={styles.tvContainer}>
            <Text style={styles.tvTitle}>{tv.original_name}</Text>
            <Text style={styles.tvVote}>{tv.vote_average}</Text>
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
   tvContainer: {position: 'absolute', bottom: '6.5%', width: '92%'},
   tvTitle: {
      color: colors.white,
      fontSize: 20,
      fontWeight: '700',
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
   },
   tvVote: {
      color: colors.white,
      width: '100%',
      backgroundColor: 'rgba(248,112,96, 0.7)',
      alignSelf: 'center',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 12,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
   },
});

export default Series;
