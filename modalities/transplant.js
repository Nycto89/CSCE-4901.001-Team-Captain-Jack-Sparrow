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
import HomeScreen from '../home';
import {Actions} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import {KidneyTransplant} from '../modalityData/modality_pros_n_cons';

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


class Transplant extends Component {

  render() {

    const {navigate} = this.props.navigation;

    console.log(this.props.navigation)

    return (
      <View>
      <ScrollView>
       <View style={styles.container}>
      	<Text style={styles.header}>What Does it Mean to Have a Transplant?</Text>
      	<Text style={styles.important_txt}>A healthy kidney is placed inside your body 
      	to perform the work your own kidneys can no longer 
      	do. These kidneys can last between 12 to 15 years on 
      	average. During this time, dialysis isn’t needed.</Text>
        <Text style={styles.header}>Where do the Kidneys Come From?</Text>
        <Text style={styles.important_txt}>Donated kidneys may come from someone who passed away 
          OR from a living donor. A healthy person who donates a kidney 
          can live a normal life with the kidney they have left. The wait 
          list for deceased donor kidneys is three to five years. Kidneys 
          from living donors can be transplanted faster. The operations are 
          done on the same day and can be scheduled at a convenient time for 
          both the patient and the donor.</Text>
        <Text style={styles.header}>Getting a Transplant</Text>
        <Text style={styles.important_txt}>1) Ask your nephrologist or healthcare provider to refer you to a 
          transplant center for evaluation OR contact a transplant center in 
          your area.</Text>
        <Text style={styles.important_txt}>2) The transplant center professionals will provide a complete physical exam, 
          review your health records and conduct testing and x-rays to evaluate your ability 
          to receive surgery.</Text>
        <Text style={styles.important_txt}>3) Find a living donor or join the waiting list for a deceased donor kidney. 
          If you are on the waitlist, you may have to be on dialysis during this time.
        </Text>
        <Text style={styles.important_txt}>4) Next step: Transplant Surgery!</Text>

          {/*SECTION LIST*/}
          <SectionList
                    renderItem={({item, index}) => {
                          return(<SectionListItem item={item} index={index}>
                            
                            </SectionListItem>);
                    }}
                    renderSectionHeader={({section}) => {
                        return(<SectionHeader section={section} />);
                    }}
                    sections={KidneyTransplant}
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
    fontSize: 20,
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'white',
    textAlign: 'left',
    paddingRight: 10
  },
  data_txt: {
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'white'
  }
});

export default Transplant;
