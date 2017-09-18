import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/comm'

export default class Categories extends Component{
    render(){
        return(
            <View style={[styles.sections,{paddingVertical:5}]} >
                <View style={styles.rows}>
                    <View >
                        <Image style={styles.catImage} source={{uri:'http://ooafrn5be.bkt.clouddn.com/cat4.png'}}/>
                        <View style={styles.absoluteCenter}>
                            <Text style={styles.fontNormal}>智能家电</Text>
                        </View>
                    </View>
                    <View >
                        <Image style={styles.catImage} source={{uri:'http://ooafrn5be.bkt.clouddn.com/cat3.png'}}/>
                        <View style={styles.absoluteCenter}>
                            <Text style={styles.fontNormal}>清单必买</Text>
                        </View>
                    </View>
                    <View >
                        <Image style={styles.catImage} source={{uri:'http://ooafrn5be.bkt.clouddn.com/cat2.png'}}/>
                        <View style={styles.absoluteCenter}>
                            <Text style={styles.fontNormal}>新品抢先</Text>
                        </View>
                    </View>
                    <View >
                        <Image style={styles.catImage} source={{uri:'http://ooafrn5be.bkt.clouddn.com/cat5.png'}}/>
                        <View style={styles.absoluteCenter}>
                            <Text style={styles.fontNormal}>游戏娱乐</Text>
                        </View>
                    </View>
                    <View >
                        <Image style={styles.catImage} source={{uri:'http://ooafrn5be.bkt.clouddn.com/cat1.png'}}/>
                        <View style={styles.absoluteCenter}>
                            <Text style={styles.fontNormal}>一元众筹</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

// AuthButton.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   logout: PropTypes.func.isRequired,
//   loginScreen: PropTypes.func.isRequired,
// };

//export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
