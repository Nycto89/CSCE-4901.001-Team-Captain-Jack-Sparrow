import {StyleSheet, Dimensions} from 'react-native';

const modalityStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#03102c',
    width: Dimensions.get('window').width,
    paddingTop: 60,
    paddingLeft: 20
  },
  header: {
    fontSize: 30,
    paddingBottom: 15,
    fontFamily: 'Verdana',
    color: 'white',
    marginTop: 15
  },
  important_txt: {
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'white',
    textAlign: 'left',
    paddingRight: 10,
    lineHeight: 30
  },
  paramount_line: {
    fontSize: 20,
    padding: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  data_txt: {
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'white',
    marginLeft: 5
  },
  subheading: {
    fontSize: 25,
    color: '#03102c',
    paddingBottom: 20
  },
  subheadingView: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    marginBottom: 20
  },
});

export {modalityStyles};