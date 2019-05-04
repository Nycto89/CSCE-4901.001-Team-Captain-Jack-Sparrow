import { Dimensions, StyleSheet } from 'react-native';

const modalityStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
    paddingTop: 60,
    paddingBottom: 175
  },
  header: {
    fontSize: 30,
    paddingBottom: 15,
    fontFamily: 'Verdana',
    /*fontWeight: "bold",*/
    marginTop: 15,
    paddingLeft: 20
  },
  important_txt: {
    paddingBottom: 20,
    fontFamily: 'Arial',
    textAlign: 'left',
    paddingRight: 10,
    lineHeight: 30,
    paddingLeft: 20
  },
  paramount_line: {
    padding: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  data_txt: {
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Arial',
    marginLeft: 5
  },
  subheading: {
    fontSize: 25,
    paddingBottom: 20
  },
  subheadingView: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 20,
    borderWidth: 5,
    marginBottom: 20
  },
});

export { modalityStyles };
