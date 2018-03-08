import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  //FlatList
} from 'react-native';
import { connect } from 'react-redux';
//组件
import Icon from 'react-native-vector-icons/FontAwesome';
import { Grid } from 'antd-mobile';
//css
import {Commstyles,windowWidth} from '../../styles/comm';
import { fetchCategory } from './actions.js'
import { routers } from '../common/actions.js'

const DEFAULT_CATEGORY_IMG = 'http://ooafrn5be.bkt.clouddn.com/category2.png';

class Caregory extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '全部分类',
    });

    _goProducts(){
        let { navigation } = this.props
        navigation.dispatch( routers('Products') )
    }

    _renderItem = (item) => (
        <TouchableWithoutFeedback onPress={()=>this._goProducts()}>
        <View style={styles.item} >
            <View style={styles.imgBox}>
                <Image style={styles.cateImg} resizeMode='stretch' source={{uri: item.img ? item.img : DEFAULT_CATEGORY_IMG}}/>
            </View>
            <View style={[Commstyles.absoluteCenter,styles.nameBox]}>
                <Text style={Commstyles.fontNormal}>{item.name}</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );

    componentDidMount(){
        let { navigation } = this.props
        navigation.dispatch(fetchCategory())
    }

    render() {
        let { category } = this.props
        let data = category.items
        let that = this
        return(
            <ScrollView style={[Commstyles.container]}>
                {
                    data.map(function(el, index) {
                        return <View style={styles.section} key={index}>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionHeaderText}>{el.name}</Text>
                                </View>
                                <Grid data={el.children}
                                  columnNum={4}
                                  hasLine={false}
                                  renderItem={dataItem => that._renderItem(dataItem)}
                                  itemStyle={{height:windowWidth/4 + 30}}
                                />
                            </View>;
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    section:{
        backgroundColor:"#fff",
        marginBottom:10,
    },
    sectionHeader:{
        height:30,
        paddingLeft:10,
        justifyContent:'center',
    },
    sectionHeaderText:{
        fontSize:16,
    },
    item: {
        flex:1,
        padding:7,
    },
    imgBox:{
        flex:4,
        marginBottom:5,
    },
    nameBox:{
        flex:1
    },
    cateImg:{
        width:'100%',
        height:'100%',

    }
});
const mapStateToProps = ( state ) => ({
    category: state.category,
});
export default connect(mapStateToProps)(Caregory);
