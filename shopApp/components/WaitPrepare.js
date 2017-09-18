import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';


class WaitPrepare extends Component{
    componentDidMount() {
        let {navigation} = this.props;
        this.timer = setInterval(() => {
            if (this.props.count <= 0) {
                this.timer && clearInterval(this.timer);
                navigation.dispatch({type:'goHome'})
            }else{
                navigation.dispatch({type:'countDown'})
            }
        }, 1000);
    }
    componentWillUnMount() {
        //clear定时器
        this.timer && clearInterval(this.timer);
    }
    render(){
        let {count,navigation} = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.instructions}>
                  等待加载界面
                </Text>
                <Text style={styles.instructions}>
                  {count}
                </Text>
            </View>
        );
    }
}
const mapStateToProps = state => ({
  count: state.countDown,
});

const mapDispatchToProps = dispatch => ({
  countDown: () => dispatch({ type: 'countDown' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitPrepare);

// const WaitPrepare = ({ navigation }) => (
//   <View style={styles.container}>
//     <Text style={styles.instructions}>
//       等待加载界面
//     </Text>
//     <Text style={styles.instructions}>
//       等待加载界面
//     </Text>
//     <Button
//       onPress={() => navigation.dispatch({ type: 'goHome' })}
//       title="goHome"
//     />
//   </View>
// );

// LoginScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// };

//export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
