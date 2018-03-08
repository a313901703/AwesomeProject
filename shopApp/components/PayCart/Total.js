import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Commstyles,windowWidth} from '../../styles/comm';

class Total extends Component {
    static propTypes = {
        count: PropTypes.number,
        text: PropTypes.string,
    };

    static defaultProps = {
        text:'结算',
    }

    constructor(props) {
        super(props);
    }

    _onPress(){
        let {onClick} = this.props
        onClick && onClick()
    }
    render() {
        let {price,count,text} = this.props
        return (
            <View style={[styles.total,Commstyles.positionBottom]}>
                <View style={[styles.totalItem]}>
                    <Text>
                        <Text>共<Text style={Commstyles.price}>
                          {count}</Text>件， 
                        </Text>
                        <Text>合计 :<Text style={Commstyles.price}>
                          ￥{price / 100}</Text>
                        </Text>
                    </Text>
                </View>
                <TouchableWithoutFeedback onPress={()=>this._onPress()}>
                <View style={[Commstyles.absoluteCenter,styles.settle]}>
                    <Text style={{color:'#fff'}}>{text}</Text>
                </View>
                </TouchableWithoutFeedback>
            </View>  
        );
    }
}
const styles = StyleSheet.create({
    total:{
        backgroundColor:"#fff",
        width:windowWidth,
        height:40,
        flexDirection: 'row',
        position:'absolute',
        left:0,
        bottom:0,
    },
    totalItem:{
        flex:1,
        justifyContent:'center',
        paddingLeft:10,
    },
    settle:{
        backgroundColor:global.redColor,
        width:100,
        height:'100%',
    },
})
export default Total;
