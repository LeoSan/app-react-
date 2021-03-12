import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Alert} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Formulario from './components/Formulario';

export default function App() {
//UsaremosEstate para la logica de negocio

const  [ busqueda, setBusqueda ] = useState({
  ciudad:'',
  pais:''
});


const [consultar, setConsultar] = useState(false);
const [resultado, setResultado] = useState({});

const {ciudad, pais} = busqueda;

//Funciones  App

//Metodo que permite evitar que se asome el teclado si no lo estamos usando 
const ocultarTeclado =()=>{
    Keyboard.dismiss();
}

const mostrarAlerta = ()=>{
  Alert.alert(
      'Error',
      'No Hay Resultado, cambia ciudad o pais',
      [{text:'Ok'}]

  );

}

//Usamos un useEffet para consultar el API del clima usamos useEffec porque esta se ejecuta 
useEffect( ()=>{

const consultarAPIClima = async () =>{

      if ( consultar ){
          console.log("Consultando API");
         
          const appId = 'fc26b927fb7c7891b06d8135e92a24b1';
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

          try {

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            console.log(resultado);
            setResultado(resultado);
            //Cambiamos el state para que el useEffect funcione
            setConsultar(false);


          } catch (error) {

            mostrarAlerta();

          }

      }
  }

  consultarAPIClima();

}, [consultar] );

  return (
    <>
      <TouchableWithoutFeedback onPress={ ()=>ocultarTeclado() }>
          <View style={styles.app}>
              <View style={styles.contenido}>
                  <Formulario
                      busqueda={busqueda}
                      setBusqueda={setBusqueda}
                      setConsultar={setConsultar}

                    />
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
