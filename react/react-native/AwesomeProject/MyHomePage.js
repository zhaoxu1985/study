import React from 'react';
import { Alert,View,TextInput,Button,ScrollView,Text,StyleSheet } from 'react-native';

const Cat = () => {
    const _onPressButton=()=> {
        Alert.alert('You tapped the button!')
      }
  return (
    <View style={css.a}>
        <Text style={css.top}>
            
        </Text>
        <TextInput ></TextInput>
        <View>
        <Button onPress={this._onPressButton} title="Press Me"></Button>
        </View>
    </View>
  );
}
const css = StyleSheet.create({
    top:{
        width:100,
        height:300,
        backgroundColor:'orange',
    },
    a:{
        color:'red',
        width:'100%',
        height:'100%',
        textAlign:'center',
        display:'flex',
        justifyContent:'center',
        overflow:'hidden'
    },
    font:{
        fontSize:20
    },
    input:{
        borderColor:'black',
        borderWidth:0.5,
        marginTop:10
    },
    btn:{
        width:20,
    }
})

export default Cat;