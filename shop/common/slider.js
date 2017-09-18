/**
 * 轮播图
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
} from 'react-native';

import Dimensions from 'Dimensions';
import Swiper from 'react-native-swiper'

const windowWidth = Dimensions.get('window').width;     //屏幕宽度

export default class SliderModule extends Component{
  static defaultProps = {
        height: 120,
        showsButtons: false,
        autoplay:true,
        showsPagination:true,
        autoplayTimeout:3,
        sliderImgs:[
          'http://ooafrn5be.bkt.clouddn.com/slider1.jpg',
          'http://ooafrn5be.bkt.clouddn.com/slider2.jpg',
          'http://ooafrn5be.bkt.clouddn.com/slider3.jpg',
        ],
    };  // 注意这里有分号
  render(){
    return(
          <Swiper style={styles.sliders} 
            showsButtons={this.props.showsButtons} 
            autoplay={this.props.autoplay} 
            height={this.props.height}  
            showsPagination={this.props.showsPagination}  
                autoplayTimeout={this.props.autoplayTimeout}
          >
            {this.props.sliderImgs.map((item,index)=>{
                    return <Image style={[styles.sliderImg,{height:this.props.height}]} key={index} source={{uri:item}} />
                })}
          </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  sliders: {
    width: windowWidth, 
  },
  sliderImg:{
    flex:1,
    width: windowWidth, 
    resizeMode:Image.resizeMode.stretch,
  },
})