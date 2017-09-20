import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import CommStyle from '../../styles/comm';
import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度

export default class Advertiserments extends Component{
    render(){
        return(
            <View style={CommStyle.sections}>
                <View style={CommStyle.rows}>
                    <View >
                        <Image style={styles.advLeftImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv1.jpg'}}/>
                    </View>
                    <View >
                        <Image style={styles.advRightImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv2.jpg'}}/>
                        <Image style={styles.advRightImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv3.jpg'}}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    advLeftImg:{
        width:windowWidth/2,
        height:200,
        resizeMode:Image.resizeMode.stretch,
    },
    advRightImg:{
        width:windowWidth/2,
        height:100,
        resizeMode:Image.resizeMode.stretch,
    },
});
