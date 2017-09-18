import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

export default class Todo extends Component {
    _addTodo(text){
        //console.log('abc123')
        this.props.onAddClick(text);
    }
    render(){
        return(
            <View style={{padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  placeholder="Type here to translate!"
                  onChangeText={(text) => this._addTodo(text)}
                />
            </View>
        );
    }
}