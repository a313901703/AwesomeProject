import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
//import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
//import Todo from './Todo';


class App extends Component {
    render(){
        const {dispatch} = this.props;
        return(
            <View style={{padding: 10}}>
                <Text>wtf</Text>
            </View>
        );
    }
}

function select(state){
    return {

    };
}
export default connect(select)(App);
