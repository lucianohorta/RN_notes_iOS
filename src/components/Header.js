import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';

export default class Header extends Component {
  renderContent() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.left}>{this.props.left}</View>
        <View style={styles.center}>{this.props.center}</View>
        <View style={styles.right}>{this.props.right}</View> 
      </View>
    );
  }

  renderHeaderWithImage() {
    return (
      <ImageBackground style={styles.headerBgImg} source={require('./../img/background.jpg')}>
        {this.renderContent()}
      </ImageBackground>
    );
  }

  renderHeaderWithoutImage() {
    return (
      <View style={[{ backgroundColor: '#f8f8f8' }, styles.container]}>
        {this.renderContent()}
      </View>
    );
  }

  render() {
    return this.props.image
      ? this.renderHeaderWithImage()
      : this.renderHeaderWithoutImage();
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    marginTop: Constants.statusBarHeight,
    height: Dimensions.get('window').height * 0.07,
  },
  headerBgImg: {
    width: Dimensions.get('window').width,
    backgroundColor: '#f8f8f8',
    borderColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    paddingTop: Constants.statusBarHeight,
  },
  left: {
    marginHorizontal: 5,
  },
  center: {
    marginHorizontal: 5,
  },
  right: {
    marginHorizontal: 5,
  },
});
