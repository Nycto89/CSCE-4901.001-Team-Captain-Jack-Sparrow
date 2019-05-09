/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, FlatList, ScrollView, Text, View, TouchableHighlight, Modal } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { PeritonealData } from './modalityData/modality_data';
import { modalityStyles } from './modalityData/modality_style';
import PeritonealItem from './modalityData/PeritonealSection';
import SectionListItem from './modalityData/sectionlistitem';

import ImageViewer from 'react-native-image-zoom-viewer';
// import Modal from 'app/modals/BaseModal';

class Peritoneal extends Component {

  state = {
    activeSections: [],
    fontVal: this.props.fontProp.fontVal,
    showZoomModal: false,
    imagesToZoom: []
  };

  openZoomPhoto( img ) {
    this.setState(({ showZoomModal: true , imagesToZoom : [ { url : '' , props : { source : img } } ] } )
    );
  }

  doesPhotoExist(v_photo) {
    if (v_photo === undefined) {
      //do nothing
    }
    else {
      // return (<Image width={Dimensions.get('window').width} style={{ paddingBottom: 20 }} source={v_photo} />);
      return ( <TouchableHighlight
                  underlayColor={'transparent'}
                  activeOpacity={.8}
                  onPress={() => this.openZoomPhoto(v_photo)}>
                    <Image width={Dimensions.get('window').width} style={{ paddingBottom: 20 }} source={v_photo} />
                </TouchableHighlight>)
      
    }
  }

  doesIconExist(v_icon) {
    if (v_icon === undefined) {
      //do nothing
    }
    else {
      return (<Image width={90} height={90} style={{ top: 20, paddingBottom: 20, tintColor: this.props.themeProp.textColor }} source={v_icon} />);
    }
  }

  doesHeadingExist(v_heading) {
    if (v_heading === undefined) {
      //do nothing
    }
    else {
      return (v_heading);
    }
  }

  isList(data) {
    if (data === undefined) {
      //do nothing
    }
    else {
      return (<FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (<SectionListItem item={item} index={index}>

          </SectionListItem>);
        }} />);
    }
  }

  isSection(type) {
    if (type === undefined) {
      //do nothing
    }
    else {
      return (<FlatList
        data={type}
        renderItem={({ item, index }) => {
          return (<PeritonealItem item={item} index={index}>

          </PeritonealItem>);
        }} />);
    }
  }


  renderHeader = section => {
    fontS = (1.5 * this.props.fontProp.fontVal);
    fontS = (fontS > 60) ? 60 : fontS;
    return (
      <View>
        <View style={{
          shadowColor: this.props.themeProp.textColor,
          shadowOffset: { height: 2 },
          shadowRadius: 5,
          shadowOpacity: 0.5
        }}>
          {this.doesPhotoExist(section.photo)}
        </View>
        <Text style={
          [modalityStyles.header,
          {
            fontSize: fontS,
            color: this.props.themeProp.accentColor
          }]}
        >
          {this.doesHeadingExist(section.heading)}</Text>
        <View style={{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20,
          marginLeft: 20
        }}></View>
      </View>
    );
  };

  renderContent = section => {
    return (
      <View>
        {this.isList(section.data)}
        {this.isSection(section.type)}
        <Text style={[modalityStyles.important_txt, { fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor }]}>
          {section.text}
        </Text>
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  //update accordion based on font size
  componentWillUpdate(nextProps, nextState) {
    if (nextState.fontVal !== nextProps.fontProp.fontVal) {
      this.updateSections([])                     //reset component
      const newVal = nextProps.fontProp.fontVal;
      this.setState({ fontVal: newVal });
    }
    return;
  }


  render() {

    return (
      <View>
        {this.state.showZoomModal &&
          <Modal>
            <View style={{ flex: 1, backgroundColor: "black", opacity: 0.9999 }}>
              <ImageViewer 
                imageUrls={this.state.imagesToZoom}
                onDoubleClick={ () => this.setState( { showZoomModal : false } ) }
                onSwipeDown={ () => this.setState( { showZoomModal : false } ) }
                enableSwipeDown={true}
              />
            </View>
          </Modal>
        }
          <ScrollView>
            <View style={[modalityStyles.container, { backgroundColor: this.props.themeProp.backgroundColor }]}>
              <Accordion
                sections={PeritonealData}
                activeSections={this.state.activeSections}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                onChange={this.updateSections}
              />
            </View>
          </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    fontProp: state.fontProps,
    themeProp: state.themeProps
  };
}

connect(mapStateToProps)(SectionListItem);
export default connect(mapStateToProps)(Peritoneal);
