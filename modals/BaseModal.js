import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const BaseModal = ({ children, verticalPercent, horizontalPercent, hideClose }) => {
  const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight;
  const width = horizontalPercent ? deviceHeight * horizontalPercent : deviceWidth;

  const renderClose = () => {
    if (hideClose) {
      return null;
    }
    return (
      <View style={styles.closeBtnContainer}>
        <TouchableOpacity onPress={Actions.pop}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { height, width }]}>
      {renderClose()}
      {children}
    </View>
  );
};

BaseModal.propTypes = {
  children: PropTypes.any,
  verticalPercent: PropTypes.number,
  horizontalPercent: PropTypes.number,
  hideClose: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  closeBtnContainer: {
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default BaseModal;