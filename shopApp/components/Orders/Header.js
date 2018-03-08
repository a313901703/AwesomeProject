import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
//css
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm.js';
import { routers } from '../common/actions.js'

class Header extends Component {
    _onPress(status){
        let {changeStatus} = this.props
        changeStatus && changeStatus(status)
    }
    render() {
        let {status} = this.props
        let headers = {999:'全部',0:'待付款',1:'待发货',2:'待收货',3:'待评价'};
        let renderHeader = []
        for(let e in headers){
            renderHeader.push(
                <TouchableWithoutFeedback key={e} onPress={()=>this._onPress(e)}>
                    <View style={[styles.headerItems,(status == e) && styles.headerActiveItems]} >
                        <Text style={(status == e) && styles.headerActiveItemsText}>{headers[e]}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return (
            <View style={styles.container}>
                {renderHeader}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexDirection: 'row',
    },
    headerItems:{
        flex:1,
        height:40,
        alignItems:'center',
        justifyContent:'center',
    },
    headerActiveItems:{
        borderBottomWidth:2,
        borderBottomColor:'#f02d00',
    },
    headerItemsText:{

    },
    headerActiveItemsText:{
        color:'#f02d00',
    },

})
export default Header;
