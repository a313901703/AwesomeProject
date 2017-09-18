import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ListItem extends Component{
    render(){
        let {item,_key} = this.props;
        return(
            <View>
                <View style={{paddingHorizontal:10}}><View style={[_key && styles.line]}></View></View>
                <View style={styles.rows}>
                    <View style={styles.rowsLeft}>
                        <Text style={styles.rowsText}>
                            {
                                item.icon ? <Icon name={item.icon} size={16} color={item.iconColor}/>    :''
                            }
                        {item.name}</Text>
                    </View>
                    <View style={styles.rowsRight}>
                        <Text style={styles.rowsDesc}>{item.desc}   
                            <Icon name={item.rightIcon ? item.desc : 'angle-right'} size={16} color='gray'/>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rows:{
        backgroundColor:"#fff",
        flexDirection: 'row',
    },
    rowsLeft:{
        flex:1,
        alignItems:'flex-start',
        padding:10,
    },
    rowsRight:{
        flex:1,
        alignItems:'flex-end',
        padding:10,
    },
    rowsText:{
        fontSize:12,
    },
    rowsDesc:{
        fontSize:11,
        color:'gray',
    },
    line:{
        height:0.7,
        backgroundColor:'#f2f2f2',
    },
});
export default ListItem;