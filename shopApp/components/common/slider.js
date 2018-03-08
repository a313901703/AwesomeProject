/**
 * 轮播图
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';

import Dimensions from 'Dimensions';
import Swiper from 'react-native-swiper'

const windowWidth = Dimensions.get('window').width;     //屏幕宽度

export default class SliderModule extends Component{
  static defaultProps = {
        height: 150,
        showsButtons: false,
        autoplay:true,
        showsPagination:false,
        autoplayTimeout:3,
        sliderImgs:[
          'http://ooafrn5be.bkt.clouddn.com/slider1.jpg',
          'http://ooafrn5be.bkt.clouddn.com/slider2.jpg',
          'http://ooafrn5be.bkt.clouddn.com/slider3.jpg',
        ],
    };
  render(){
    return(
        <View style={{height:this.props.height}}>
          <Swiper 
            showsButtons={false} 
            autoplay={true} 
            showsPagination={this.props.showsPagination}  
                autoplayTimeout={this.props.autoplayTimeout}
          >
            {this.props.sliderImgs.map((item,index)=>{
                    return <Image style={{width:windowWidth,height:this.props.height,resizeMode:Image.resizeMode.stretch}} key={index} source={{uri:item}} />
                })}
          </Swiper>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  
})