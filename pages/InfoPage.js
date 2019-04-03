import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ActionSheet } from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class InfoPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Information Page!</Text>
        <Button
          title="Back to home"
          onPress={() =>
            Actions.HomeScreen({ type : "reset" })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});