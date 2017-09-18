
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {Commstyles,themeColor} from '../../styles/comm';

const Comment = () => (
    <View style={Commstyles.sectionBottom}>
        <View style={styles.commentHeader}>
            <View><Text style={styles.headerText}>评论(200)</Text></View>
            <View>
                <Text style={styles.headerText}>好评率 <Text style={Commstyles.fontThemeColor}>96%</Text></Text>
            </View>
        </View>
        <View style={styles.commentItem}>
            <View style={styles.commentBody}>
                <View style={styles.bodyHeader}>
                    <Image style={styles.thumb} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}/>
                    <View style={Commstyles.absoluteCenter}>
                        <Text style={styles.userName}>   a313901703</Text>
                    </View>
                </View>
                <View style={styles.bodyContent}>
                    <Text style={styles.commentText}>This is some comment</Text>
                </View>
                <View style={styles.bodyHeader}>
                    <Text style={styles.headerText}>Product Name And Formats</Text>
                </View>
            </View>
        </View>
        <View style={[styles.commentFooter,Commstyles.absoluteCenter]}>
            <View style={[styles.goCommentBtn,Commstyles.absoluteCenter]}>
                <Text style={styles.goCommentText}>查看全部评论</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    commentHeader:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical:10,
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:0.7,
    },
    headerText:{
        fontSize:12,
        color:'gray',
    },
    bodyHeader:{
        paddingVertical:6,
        flexDirection: 'row',
    },
    thumb:{
        width:30,
        height:30,
        borderRadius:15,
        resizeMode:Image.resizeMode.stretch,
    },
    userName:{
        fontSize:8,
    },
    commentText:{
        fontSize:11,
    },
    commentFooter:{
        height:50,
    },
    goCommentBtn:{
        width:100,
        height:25,
        borderRadius:10,
        borderColor:themeColor,
        borderWidth:1,
    },
    goCommentText:{
        fontSize:12,
        color:themeColor,
    }


});
export default Comment;