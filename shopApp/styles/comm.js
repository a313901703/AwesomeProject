import {
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';
export const windowWidth = Dimensions.get('window').width;     //屏幕宽度
export const windowHeight = Dimensions.get('window').height;   //屏幕高度

export const themeColor = '#ff0033';

export const Commstyles = {
    bgThemeColor:{
        backgroundColor:themeColor,
    },
    fontThemeColor:{
        color:themeColor,
    },
    container: {
        flex:1,
        backgroundColor: '#fbfbfb',
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
        fontSize:13,
    },
    sections:{
        width:windowWidth,
        marginTop:10,
        backgroundColor:'#fff',
    },
    sectionBottom:{
        marginBottom:10,
        backgroundColor:'#fff',
        paddingHorizontal:10,
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
    rows:{
        flexDirection: 'row',
        justifyContent:'space-around',
    },
    h4:{
        fontSize:14,
        fontWeight:'bold',
    },
    //category
    catImage:{
        width:windowWidth/5-10,
        height:windowWidth/5-10,
        marginBottom:5,
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
        backgroundColor:'rgba(255,255,255,0)',
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
        height:windowWidth*0.33+40,
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

export default Commstyles;