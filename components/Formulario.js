import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Animated, ScrollView  } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function Formulario() {

//Debemos crear un useState para la animacion: 
const [ animacionboton ] = useState(new Animated.Value(1));


//Definimos nuestros metodos interactivos 

const animacionEntrada = ()=>{
    console.log("entrada");
    Animated.spring( animacionboton, {
        toValue:.9,
        duration: 2000,
        useNativeDriver:true //Add this line
    } ).start();
}

const animacionSalida = ()=>{
    console.log("salida");

}

const estiloAnimacion =()=>{

    transform:[{scale: animacionboton}]
}

  return (
    <View style={styles.formulario}>
       
        <ScrollView>
            <View style={styles.contInput}>
                <TextInput 
                    style={styles.input}
                    placeholder='ciudad'
                    placeholderTextColor='black'
                />
            </View>    

            <View style={styles.contInput}>
                <Picker
                    style={styles.select}
                >
                    <Picker.Item label="- Seleccione un Pais-"       value="" /> 
                    <Picker.Item label="- Argentina -"       value="AR" />                                                   
                    <Picker.Item label="- Colombia -"        value="CO" />                                                   
                    <Picker.Item label="- México -"          value="MX" />                                       
                    <Picker.Item label="- USA-"              value="US" />                                       
                </Picker>

            </View>

                <TouchableWithoutFeedback 
                    onPressIn  = { () => animacionEntrada()  }
                    onPressOut = { () =>  animacionSalida() }
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
