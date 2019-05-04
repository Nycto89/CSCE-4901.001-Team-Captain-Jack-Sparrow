import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal';


export default class SettingsModal extends React.Component {
  render() {
    return (
      <Modal hideClose verticalPercent={.5} horizontalPercent={.5}>
        <View flex={1} style={styles.container}>
          <Text>Settings Modal</Text>
          <Button title="Close" onPress={Actions.pop} />
        </View>
      </Modal>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: 'green'
  },
});