import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, 
    View, Image , ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const { height, width } = Dimensions.get('window');

export default class HomeCarousel extends Component {

    state = {
        images: [
            'https://unsplash.it/300/?random',
            'https://unsplash.it/350/?random',
            'https://unsplash.it/400/?random',
            'https://unsplash.it/450/?random',
            'https://unsplash.it/500/?random',
            'https://unsplash.it/550/?random',
            'https://unsplash.it/600/?random'
        ]
    };

    renderItem = ({item, index}) => {
        return (
            <Image style={styles.logoStyle} source={{ uri: item }} />
        );
    }

    render () {
        return (
            <View>
                <View style={{
                    transform: [{
                        rotate: '0deg'
                    }]
                }}>
                    <Carousel
                      inactiveSlideOpacity={0.9}
                      inactiveSlideScale={1}
                      firstItem={1}
                      sliderWidth={width}
                      itemWidth={width}
                      data={this.state.images}
                      renderItem={this.renderItem}
                    />
                </View>
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
    logoStyle: {
        // transform: [{
        //     rotate: '0deg'
        // }],
        width: width,
        height: height
    }
};
