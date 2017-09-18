import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native'
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import Loign from './LoginScreen';

export default class LoginButton extends Component{
    render(){
      let navigate = this.props.navigation;
      return(
        <View>
          <Text>This is the home screen of the app</Text>
          <Button
            onPress={() => navigate('Profile', {name: 'Brent'})}
            title="Go to Brent's profile"
          />
        </View>
      );
    }
}
