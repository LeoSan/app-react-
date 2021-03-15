import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Alert} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';

export default function App() {
//UsaremosEstate para la logica de negocio

const  [ busqueda, setBusqueda ] = useState({
  ciudad:'',
  pais:''
});


const [consultar, setConsultar] = useState(false);
const [resultado, setResultado] = useState({});
const [bgColor,   setbgColor]   = useState('rgb(71, 149, 212)');

const {ciudad, pais} = busqueda;

const bgColorApp = {
  backgroundColor: bgColor
}

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

          let request = new Request( url, {
             method:'GET',
          });  

          try {

            const respuesta = await fetch(request)
              .catch(function (err){
                console.error(err);
              });
            const resultado = await respuesta.json();

            console.log(resultado);
            setResultado(resultado);
            //Cambiamos el state para que el useEffect funcione
            setConsultar(false);

            // Modifica los colores de fondo 
            const kelvin   = 273.15;
            const { main } = resultado;
            const actual   = main.temp - kelvin;


            if(actual < 10) {
              setbgColor('rgb( 105, 108, 149 )');
            } else if(actual >= 10 && actual < 29) {
              setbgColor('rgb(71, 149, 212)');
            } else {
              setbgColor('rgb( 178, 28, 61)');
            }


          } catch (error) {
           // console.log("alertas");  
            mostrarAlerta();

          }

      }
  }

  consultarAPIClima();

}, [consultar] );

  return (
    <>
      <TouchableWithoutFeedback onPress={ ()=>ocultarTeclado() }>
            <View style={[styles.app, bgColorApp ]}>
              <View style={styles.contenido}>
                  <Formulario
                      busqueda={busqueda}
                      setBusqueda={setBusqueda}
                      setConsultar={setConsultar}

                    />
                    <Resultado
                        resultado = {resultado}
                    />
              </View>
          </View>
        </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal:'2.5%'

  },
});
