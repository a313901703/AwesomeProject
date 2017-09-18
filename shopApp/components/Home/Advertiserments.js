import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CommStyle from '../../styles/comm';
import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度

export default class Advertiserments extends Component{
    render(){
        return(
            <View style={CommStyle.sections}>
                <View style={CommStyle.rows}>
                    <View >
                        <Image style={CommStyle.advLeftImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv1.jpg'}}/>
                    </View>
                    <View >
                        <Image style={CommStyle.advRightImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv2.jpg'}}/>
                        <Image style={CommStyle.advRightImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv3.jpg'}}/>
                    </View>
                </View>
            </View>
        );
        return(
            <View style={CommStyle.sections}>
                <Grid >
                    <Col style={CommStyle.advLeft}>
                        <Image style={CommStyle.advLeftImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv1.jpg'}}/> 
                    </Col>
                    <Col style={CommStyle.advRight}>
                        <Row style={{borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                            <Image style={CommStyle.advRightImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv2.jpg'}}/> 
                        </Row>
                        <Row >      
                            <Image style={CommStyle.advRightImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv3.jpg'}}/> 
                        </Row>
                    </Col>
                </Grid>
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
