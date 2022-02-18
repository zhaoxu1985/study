import { white } from 'chalk';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

//获取屏幕宽高
const {width, height} = Dimensions.get('screen');
console.log(width, height);
const rpx = e => (width / 750) * e;

export default class login extends Component {

    state = {
        uname:'',
        pwd:'',
    }

  render() {
    return (
      <ImageBackground
        blurRadius={25}
        source={require('../assets/bg.jpg')}
        style={s.bg}>
        <StatusBar backgroundColor="transparent" translucent />
        
        <Text style={s.logo}>飞车</Text>
        <View style={ {width:rpx(650)} }>
            <TextInput  onChangeText={uname=>this.setState({uname})} style={s.input} placeholder="邮箱/手机号">{this.state.uname}</TextInput>
            <TextInput  onChangeText={ pwd=>this.setState({pwd})} style={s.input} placeholder="邮密码" maxLength={18} secureTextEntry></TextInput>
            <TouchableNativeFeedback  onPress={()=>console.log('aaa')}>
                <View style={s.loginBtn}>
                    <Text style={ { textAlign:'center',fontSize:rpx(35) } }>登录</Text>
                </View>
            </TouchableNativeFeedback>
            <View style={s.resetorGoSingin}>
                <TouchableOpacity onPress={()=>console.log('aaa')}>
                    <Text style={ {color:'white' , fontSize:rpx(25)} }>忘记密码?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>console.log('aaa')}>
                    <Text style={ {color:'white' , fontSize:rpx(25)} }>手机注册</Text>
                </TouchableOpacity>
               
            </View>
        </View>
        <View style={s.dsfBox}>
            <View style={ {width:rpx(650)} }>
                <Text style={{textAlign:'center',color:'white',fontSize:rpx(25)}}>第三方账户登录</Text>
            </View>
            <View style={ { flexDirection:'row',width:rpx(650) ,marginTop:rpx(50),justifyContent:'center' } }>
                <TouchableOpacity style={{marginHorizontal:rpx(20),backgroundColor:'white',padding:rpx(10),borderRadius:rpx(750)}}>
                    <Image source={require('../assets/wb.png')} 
                    style={s.dsf} ></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal:rpx(20),backgroundColor:'white',padding:rpx(10),borderRadius:rpx(750)}}> 
                    <Image source={require('../assets/qq.png')} 
                     style={s.dsf}></Image> 
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal:rpx(20),backgroundColor:'white',padding:rpx(10),borderRadius:rpx(750)}} >
                    <Image source={require('../assets/wx.png')} 
                    style={s.dsf}></Image> 
                </TouchableOpacity>
            </View>
        </View>
      </ImageBackground>
    );
  }
}

const s = StyleSheet.create({
    logo:{
        color:'white',
        fontSize:rpx(80),
        marginTop:rpx(180),
        marginBottom:rpx(80)
    },
    bg:{
        width, 
        height, 
        paddingTop: StatusBar.currentHeight,
        alignItems:'center',
        position:'relative'
    },
    input:{
        backgroundColor:'white',
        marginBottom:rpx(50),
        borderRadius:rpx(10),
        padding:rpx(20),
    },
    loginBtn:{
        width:rpx(650),
        backgroundColor:'#FAAC4F',
        padding:rpx(20),
        borderRadius:rpx(10),
    },
    resetorGoSingin:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:rpx(20)
        
    },
    //第三方 登录按钮
    dsf:{
        width:rpx(60),
        height:rpx(60)
    },
    dsfBox:{
        position:'absolute',
        bottom:rpx(50)
    }
});
