/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions, ListView, SectionList} from 'react-native';
import {Button} from 'native-base';
import {DrawerActions} from 'react-navigation';
import ModalityHome from './home';
import {Action} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import {PeritonealData} from './modalityData/modality_pros_n_cons';

class SectionListItem extends Component {
  render() {

      return (
        <View>
          <Text style={styles.data_txt}>
            {this.props.item.description}
          </Text>
          <View style= {{
          backgroundColor: 'white',
          height: 1,
          marginRight: 4
        }}></View>
        </View>
      );
  }
}

class SectionHeader extends Component {
  render() {

      return (
        <View>
          <Text style={styles.header}>
            {this.props.section.title}
          </Text>
        </View>
      )

  }

}

class Peritoneal extends Component {

  render() {

    const {navigate} = this.props.navigation;

    console.log(this.props.navigation)

    return (
      <View>
      <ScrollView>
       <View style={styles.container}>
      	<Text style={styles.header}>What is Peritoneal Dialysis?</Text>
      	<Text style={styles.important_txt}>Peritoneal Dialysis or PD is a home dialysis option. 
        In PD, the inside lining of your own belly acts as a natural filter. A cleansing fluid called 
        Dialysate, washes in and out of your abdominal cavity in cycles, which removes fluids and 
        waste products.</Text>
        <Text style={styles.header}>How does Peritoneal Dialysis Work?</Text>
        <Text style={styles.important_txt}>A soft plastic tube is placed in your belly through surgery. 
            Dialysate is moved in and out of your belly through this catheter. When the solution is inside 
            your body, it draws excess fluids and waste products from your system and then is drained out 
            through the catheter. </Text>
        <Text style={styles.header}>Where to Start</Text>
        <Text style={styles.important_txt}>Receiving a PD catheter requires outpatient surgery; 
            patients usually go home on the same day. It may require healing within a few weeks, 
            but the catheter may be used almost immediately.</Text>
        <Text style={styles.header}>There are two types of Peritoneal Dialysis:</Text>
        <View style={styles.subheadingView}>
         <Text style={styles.subheading}> 1) Continuous Ambulatory Peritoneal Dialysis (CAPD) - </Text>
         </View>
         <Text style={styles.important_txt}> “continuous”, machine-free dialysis where exchanges 
           of dialysate are done 4 to 5 times a day while the patient is awake and doing normal 
           activities. Each exchange takes about 30 minutes. The fluid containing the wastes 
           removed from your body is drained out and replaced by fresh dialysate. </Text>
           <View style={styles.subheadingView}>  
           <Text style={styles.subheading}> 2) Automated Peritoneal Dialysis (APD) -</Text>  
          </View>
          <Text style={styles.important_txt}> A machine called a Cycler delivers and then drains 
            the solution for you. The treatment is usually done at night while you sleep. Your 
            physician may order you to keep fluid dwelling during the day in addition to your cycles 
            at night depending on how much dialysis you need. </Text>
       
       {/*SECTION LIST*/}
       <SectionList
                    renderItem={({item, index}) => {
                          return(<SectionListItem item={item} index={index}>
                            
                            </SectionListItem>);
                    }}
                    renderSectionHeader={({section}) => {
                        return(<SectionHeader section={section} />);
                    }}
                    sections={PeritonealData}
                    keyExtractor={(item, index) => item.name}
          >

          </SectionList>
          </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#A52A2A',
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height*3),
    paddingTop: 60,
    paddingLeft: 20
  },
  header: {
    fontSize: 30,
    paddingBottom: 15,
    fontFamily: 'Verdana',
    color: 'white'
  },
  important_txt: {
    fontSize: 15,
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'white',
    textAlign: 'left',
    paddingRight: 10
  },
  subheading: {
    fontSize: 25,
    color: '#A52A2A',
    paddingBottom: 20
  },
  subheadingView: {
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white'
  },
  data_txt: {
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'white'
  }
});

export default Peritoneal;
