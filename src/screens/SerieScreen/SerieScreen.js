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

const SerieScreen = ({route}) => {
   const [series, setSeries] = React.useState(route.params.serieRecomended);

   const handlerTvRecomendations = async id => {
      await Axios.get(
         `${Config.API_URL}/${Config.API_VERSION}/tv/${id}/recommendations?api_key=${Config.API_TOKEN}&language=es-AR&page=1`,
      ).then(res => {
         setSeries(res.data.results)
      });
   };

   return (
      <ScrollView>
         <View>
            <Text style={styles.title}>SERIES RECOMENDADAS</Text>
            {series.map(serie => {
               const backdropUrl = `${Config.API_IMAGE}${serie.backdrop_path}`;
               return (
                  <TouchableOpacity
                     key={serie.id}
                     onPress={() => handlerTvRecomendations(serie.id)}>
                     <View>
                        <View style={styles.container}></View>
                        <Image
                           source={{uri: backdropUrl}}
                           resizeMethod={'auto'}
                           resizeMode={'cover'}
                           style={styles.imageContainer}
                        />
                        <Text style={styles.serieTitle}>
                           {serie.original_name}
                        </Text>
                     </View>
                  </TouchableOpacity>
               );
            })}
         </View>
      </ScrollView>
   );
};

export default SerieScreen;

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
   serieTitle: {
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
