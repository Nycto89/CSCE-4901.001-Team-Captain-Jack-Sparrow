import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, 
    View, Image , ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const { height, width } = Dimensions.get('window');

export default class HomeCarousel extends Component {
    constructor() {
        super()
        this.state = {
          images: [
            require('app/images/home_carousel/doctorpatient.png'),
            require('app/images/home_carousel/kidneyhands.png'),
            require('app/images/home_carousel/doctoroptions.png'),
            require('app/images/home_carousel/kidneysblood.png'),
          ],
        }
      }

    renderItem = ({item, index}) => {
        return (
            <Image style={styles.entryStyle} source={  item } resizeMode="cover"/>
        );
    }

    render () {
        return (
                <View style={{ flex : 1, width : width }}>
                {/* // width : width, height : (3/7) * height }}> */}
                    <Carousel
                        inactiveSlideOpacity={0.9}
                        inactiveSlideScale={1}
                        firstItem={1}
                        sliderWidth={width}
                        itemWidth={width}
                        data={this.state.images}
                        renderItem={this.renderItem}
                        enableMomentum={true}
                        loop={true}
                        autoplay={true}
                        autoplayDelay={2000}
                        autoplayInterval={8000}
                    />
                </View>
        );
    }

    // _renderItem ({item, index}) {
    //     return (
    //         <View style={styles.slide}>
    //             <Text style={styles.title}>{ item.title }</Text>
    //         </View>
    //     );
    // }

    // render () {
    //     return (
    //         <Carousel
    //           ref={(c) => { this._carousel = c; }}
    //           data={this.state.entries}
    //           renderItem={this._renderItem}
    //           sliderWidth={sliderWidth}
    //           itemWidth={itemWidth}
    //         />
    //     );
    // }
}

const styles = {
    entryStyle: {
        // transform: [{
        //     scale: .5
        // }],
        flex : 1,
        width: width,
        // height: height,
        // backgroundColor : 'green'
    }
};
