import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Formulario from './components/Formulario';

export default function App() {


  //Funciones 
const ocultarTeclado =()=>{
    Keyboard.dismiss();
}

  return (
    <>
      <TouchableWithoutFeedback onPress={ ()=>ocultarTeclado() }>
          <View style={styles.app}>
              <View style={styles.contenido}>
                  <Formulario/>
              </View>
          </View>
        </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'rgb(71, 149, 212)',
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal:'2.5%'

  },
});
