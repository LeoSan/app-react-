import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Animated  } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function Formulario() {

//Debemos crear un useState para la animacion: 
const [animacionboton] = useState( new Animated.Value(1) );

  return (
    <View style={styles.formulario}>
    <View>
        <TextInput 
            style={styles.input}
            placeholder='ciudad'
            placeholderTextColor='#666'
        />
    </View>    
    <View>
        <Picker
            itemStyle={{height:120, backgroundColor:'#FFF'}}
        >
            <Picker.Item label="- Seleccione un Pais-"       value="" /> 
            <Picker.Item label="- Argentina -"       value="AR" />                                                   
            <Picker.Item label="- Colombia -"        value="CO" />                                                   
            <Picker.Item label="- México -"          value="MX" />                                       
            <Picker.Item label="- USA-"              value="US" />                                       
        </Picker>

    </View>
    <View
         style={styles.btnBuscar}
    >
            <TouchableWithoutFeedback>
                <Text 
                    style={styles.textBuscar}
                > Clima para Hoy ?  </Text>
            </TouchableWithoutFeedback>
    </View>
    
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
        height:50,
        fontSize:20,
        marginBottom:20,
        textAlign:'center',
    },
    btnBuscar:{
        marginTop:50,
        backgroundColor:'#000',
        padding:10,
        justifyContent:'center',
    },
    textBuscar:{
        color:'#FFF',
        fontWeight:'bold',
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:18
    }
});
