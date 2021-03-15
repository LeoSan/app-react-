import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Resultado({resultado}) {


  const {name, main} = resultado; 

  if (!name ) return null;

  //Formula para grando K a C 
  const kelvin = 273.15;

  return (
    
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={[styles.texto, styles.actual]}>
          { parseInt( main.temp - kelvin )}&#x2103;
          <Text style={styles.temperatura} >  </Text>
          <Image 
                    style={{width: 66, height: 58}}
                    source={{ uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png` }}
          />
      </Text>

      <View style={ styles.temperatura2 }>
        <Text style={ styles.texto }> Min {''}
            <Text style={styles.temperatura} >  
                { parseInt(main.temp_min - kelvin) }&#x2103;
            </Text>
        </Text>
        <Text style={ styles.texto}>Max {''}
            <Text style={styles.temperatura} >  
                { parseInt(main.temp_max - kelvin) }&#x2103;
            </Text>
        </Text>

      </View>


      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom:20,

  },  
  texto: {
    color:'#FFF',
    fontSize:20,
    textAlign:'center', 
    marginRight:20,

  },
  actual: {
    fontSize:80,
    marginRight:0, 
    fontWeight:'bold', 
  },  
  temperatura: {
    fontSize:24, 
    fontWeight:'bold', 

  }, 
  temperatura2: {
    flexDirection:'row', 
    justifyContent: 'center', 
  },
});
