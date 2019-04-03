import React, {Component} from 'react';
import {View, Text} from 'react-native'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Slider from 'react-native-slider';
import {changeFontSize} from '../actions/index';


class FontSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
          value: 30,
        };
      }
    
      getFontProp = () => {
        return this.props.fontProp.map((fontPropety) => {
            console.log("VALUE: " + fontPropety.fontVal);
            return(fontPropety.fontVal);
        })
    }

      change(value) {
        this.setState(() =>{
            value = parseInt(value)
            this.props.changeFontSize(value);
        });
      }

      getFontValue(){
              return(
                <Text key="fontSize">{this.props.fontProp.fontVal}</Text>
              );
      }

        render(){

            const {value} = this.state;
            console.log(this.props);

            return(
                <View>
                <Slider 
                step={5}
                maximumValue={50}
                minimumValue={25}
                onValueChange={this.change.bind(this)}
                value={this.props.fontProp.fontVal}
                trackStyle={{width: 250}}
                style={{
                 margin: 15}}
                thumbTintColor= 'gray'
                minimumTrackTintColor= 'gray'
                maximumTrackTintColor= 'black'
                />
                {this.getFontValue()}
                </View>
            );
        }
    }

    function mapStateToProps(state) {
        return {
        fontProp: state.fontProps
        };
     }

    function matchDispatchToProps(dispatch){
        return bindActionCreators({changeFontSize: changeFontSize}, dispatch)
    }


export default connect(mapStateToProps, matchDispatchToProps)(FontSlider);