import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Animated, ScrollView, Alert  } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function Formulario({ busqueda, setBusqueda, setConsultar }) {

//Debemos crear un useState para la animacion: 
const [ animacionboton ] = useState( new Animated.Value(1) );

//Extraemos los objetos que vienen de APP distroccion 

const {pais, ciudad} = busqueda;


//Definimos nuestros metodos interactivos 

const animacionEntrada = () => {
    console.log("entrada");
    Animated.spring( animacionboton, {
        toValue:.75,
        useNativeDriver:true //Add this line
    } ).start();
}

const animacionSalida = ()=>{
    console.log("salida");

    Animated.spring( animacionboton, {
        toValue:1,
        friction:4,
        tension:30,
        useNativeDriver:true //Add this line
    } ).start();    

}

//Metodo de la animacion para hacer la animacion

const estiloAnimacion =()=>{
    transform: [{ scale: animacionboton }] 
}


//Metodo de validacion 

const validaDatos = () =>{

    if(pais.trim() === '' || ciudad.trim() === '') {
        mostrarAlerta();
        return;
    }
    //Cambiamos el state para que el useEffect funcione
    setConsultar(true);
}

const mostrarAlerta = ()=>{
    Alert.alert(
        'Error',
        'Agrega una ciudad y pais para consultar el clima',
        [{text:'Entendido'}]

    );

}

  return (
    <View style={styles.formulario}>
       
        <ScrollView>
            <View style={styles.contInput}>
                    <TextInput  
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ ciudad => setBusqueda({ ...busqueda, ciudad }) }
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
            </View>    

            <View style={styles.contInput}>
                <Picker
                    itemStyle={{textAlign:'center',marginLeft:20}}
                    selectedValue={pais}
                    style={styles.select}
                    onValueChange={ pais => setBusqueda({ ...busqueda, pais }) }
                >
                    <Picker.Item label="-- Seleccione un Pais-"       value="" /> 
                    <Picker.Item label="-- Argentina --"              value="AR" />                                                   
                    <Picker.Item label="-- Colombia --"               value="CO" />                                                   
                    <Picker.Item label="-- México --"                 value="MX" />                                       
                    <Picker.Item label="-- USA --"                    value="US" />                                       
                </Picker>

            </View>

                <TouchableWithoutFeedback 
                    onPressIn  = { () =>  animacionEntrada()  }
                    onPressOut = { () =>  animacionSalida() }
                    onPress = {    () =>  validaDatos() }
                >
                    
                    <Animated.View
                            style={[ styles.btnBuscar, estiloAnimacion ] }
                    >
                    
                    <Text 
                        style={styles.textBuscar}
                    > Clima para Hoy ?  </Text>

                    </Animated.View> 
                </TouchableWithoutFeedback>
            </ScrollView>   
    
</View>

  );
}

const styles = StyleSheet.create({
    formulario: {
        marginTop:100,
        
    },    
    input: {
        backgroundColor:'#FFF',
        padding:10,
        height:70,
        fontSize:20,
        textAlign:'center',
    },
    btnBuscar:{
        marginTop:50,
        backgroundColor:'#000',
        padding:10,
        justifyContent:'center',
        height:70,
    },
    textBuscar:{
        color:'#FFF',
        fontWeight:'bold',
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:18
    },
    select:{
        height:70, 
        backgroundColor:'#FFF',
        
    }, 
    contInput:{
        borderColor: "black",
        borderWidth: 2, 
        borderStyle:'solid',
        marginVertical:15,
        

    }
});
