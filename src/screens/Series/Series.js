import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import * as colors from '../../configs/colors';

const Series = ({tv}) => {
   const posterUrl = `${Config.API_IMAGE}${tv.poster_path}`;

   return (
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
