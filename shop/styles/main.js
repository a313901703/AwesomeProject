import {
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度
const windowHeight = Dimensions.get('window').height;   //屏幕高度
const themeColor = '#33ccff';

export default {
    container: {
        backgroundColor: '#f3f6f9',
    },
    headerStyle: {
        backgroundColor: themeColor,
    },
    headerBody:{
        alignItems:'center',
    },
    absoluteCenter:{
        alignItems:'center',
        justifyContent:'center',
    },
    fontNormal:{
        color:'#333',
        fontSize:10,
    },
    sections:{
        marginTop:10,
        backgroundColor:'#fff',
    },
    sectionHeader:{
        height:30,
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:5,
        backgroundColor:"#FCFCFC",
    },
    sectionHeaderText:{
        fontSize:13,
        marginLeft:5,
        color:'#212224',
    },
    sectionBody:{
        paddingHorizontal:10,
    },

    cats:{
        justifyContent:'space-between',
    },
    //category
    catItem:{
        padding:8,
        alignItems:'center',
        justifyContent:'center',
    },
    catImage:{
        // height:'100%',
        marginBottom:5,
        resizeMode:Image.resizeMode.stretch,
    },

    //广告
    advLeft:{
        height: 200,
        borderRightWidth:1,
        borderRightColor:'#ddd'
    },
    advRight:{
        height: 200,
    },
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
    advRow:{
        width:windowWidth,
        height:120,
        resizeMode:Image.resizeMode.stretch,
    },

    //商品列表
    goodsList:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal:10,
    },
    //推荐
    RecommendGoodsItem:{
        height:windowWidth*0.3+50,
        marginRight:8,
    },
    RcommendGoodsImg:{
        width:windowWidth*0.3,
        height:windowWidth*0.3,
    },
    //新品
    newsGoodsItem:{
        width:windowWidth*0.7,
        height:windowWidth*0.3,
        marginRight:8,
    },
    newsGoodsImage:{
        width:windowWidth*0.7,
        height:windowWidth*0.3,
        resizeMode:Image.resizeMode.stretch,
    },
    newsInfo:{
        position:'absolute',
        left:8,
        bottom:5,
        width:windowWidth*0.5,
        fontSize:9,
        lineHeight:16,
        color:"#fff",
    },
   
    goodsItem:{
        width:windowWidth*0.46,
        height:windowWidth*0.33+50,
    },

    goodsImg:{
        width:windowWidth*0.46,
        height:windowWidth*0.33,
    },
    goodsName:{
        fontSize:10,
        lineHeight:18,
        marginBottom:5,
    },
   
    price:{
        color:'red',
        fontSize:13,
    },
    marketPrice:{
        fontSize:8,
        color:'gray',
        textDecorationLine:'line-through',
    },
    nums:{
        color:'gray',
        flex:1,
        fontSize:10,
        lineHeight:18,
        textAlign:'right',
    },
    //loading
    loadingMore:{
        marginVertical:10,
        alignItems:'center',
        width:windowWidth,
    },
    loadingText:{
        color:'#777',
        fontSize:12,
        textAlign:"center",
    },
}