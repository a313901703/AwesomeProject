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
    flex1:{
        flex:1,
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
        marginTop:8,
        backgroundColor:'#fff',
        padding:10,
    },
    sectionNoPadding:{
        marginTop:8,
        backgroundColor:'#fff',
    },
    sectionRows:{
        marginBottom:8,
    },
    //ProductInfo
    productName:{
        color:'#333',
    },
    productDesc:{
        fontSize:10,
        color:'red',
    },
    price:{
        color:'red',
        fontSize:13,
    },
    //ProductParams
    listRows:{
        padding:10,
    },
    //Comment
    commentBy:{
        fontSize:7,
        color:"#777",
        marginBottom:5,
    },
    commentItem:{
        paddingVertical:6,
        borderBottomColor:'#eee',
        borderBottomWidth:0.7,
    },
    //footer
    footer:{
        height:30,
        marginBottom:45,
    },

    //PayNav
    PayNav:{
        backgroundColor:'#fff',
        flexDirection:'row',
        height:45,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
    },
    PayNavIcon:{
        flex:1,
    },
    payBtn:{
        backgroundColor:themeColor,
        flex:2,
    },
    payBtnText:{
        color:'#fff',
    },
    payCartNum:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'red',
        position:'absolute',
        right:-5,
        top:-5,
    },
    modalContainer:{
        flex:1,
    },
    innerContainer:{
        borderRadius:10,
        paddingHorizontal:40,
        paddingVertical:15,
        opacity:0.8,
        backgroundColor:'#aaa',
    },
    modalItem:{
        marginBottom:10,
    },

    //Modals
    paramsBox:{
        flex:1,
        //backgroundColor:'rgba(6,6,6,0.7)',
        height:windowHeight,
    },
    params:{
        marginTop:windowHeight * 2 / 5,
        width:windowWidth,
        height:windowHeight * 3 / 5,
        backgroundColor:'#fff',
    },
    modalTitle:{
        height:40
    },
    modalTitleText:{
        fontSize:18,
        color:'#222',
    },
    modalBody:{

    },
    modalFooter:{
        height:30,
        backgroundColor:themeColor,
        position:'absolute',
        bottom:0,
        left:0,
        width:windowWidth,
    },
    modalFooterText:{
        color:'#fff',
    },

}               