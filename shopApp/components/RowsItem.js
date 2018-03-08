import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class RowsItem extends Component{
    static defaultProps = {
        type:'default',
        leftStyle:{},
        rightStyle:{},
        rightText:'',
        rightIcon:'',
    };
    static propTypes = {
        leftText: PropTypes.string.isRequired,
        leftIcon: PropTypes.string,
        rightText: PropTypes.string.isRequired,
        rightIcon: PropTypes.string,
        type: PropTypes.string,        
    };
    render(){
        let {leftText,rightText,rightIcon,color,leftStyle,rightStyle} = this.props
        return (
            <View style={styles.row}>
                <View style={styles.rowItem}>
                    <Text style={styles.itemText}>{leftText}</Text>
                </View>
                <View style={styles.rowItem}>
                    <Text style={[styles.itemText,styles.rowTextRight]}>
                        {rightText}
                        {
                            rightIcon ? <Icon style={{marginLeft:5}} name={rightIcon} size={16} color={color}/> : ''
                        }
                    </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        paddingHorizontal:10,
    },
    row:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        height:40,
        borderBottomColor:'#fbfbfb',
        borderBottomWidth:1,
    },
    rowItem:{
        flex:1,
        justifyContent:'center',
    },
    rowTextRight:{
        textAlign:'right',
    },
    rowInput:{
        flex:1,
        justifyContent:'center',
    },
})
export default RowsItem;
