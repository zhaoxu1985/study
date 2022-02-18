import React, { Component } from 'react'
import { Text, View,Dimensions } from 'react-native'

/*
    rpx:相对像素，为了适配不同的手机大小
    UI工程师  会提供效果图，宽度设计为 750
    我们需要把手机的时机宽度，分成 750份 。然后就可以根据份数算出每个元素的实际大小
*/
const {width,height} = Dimensions.get('screen')

//分成750 份
const rpx = (x)=> (width/750)*x;
//例如： 200份的实际像素宽度，：rpx(200)


export default class Rpx extends Component {
    render() {
        return (
            <View>
                <Text style={{width:rpx(375),height:50 ,backgroundColor:'red' }}> textInComponent </Text>
                <Text style={{width:180,height:50 ,backgroundColor:'blue'}}> textInComponent </Text>
            </View>
        )
    }
}
