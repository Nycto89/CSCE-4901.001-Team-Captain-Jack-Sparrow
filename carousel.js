import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, 
    View, Image , ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const { height, width } = Dimensions.get('window');

export default class HomeCarousel extends Component {

    state = {
        images: [
            'https://images.unsplash.com/photo-1450297428000-5f0b50540da9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1498475738132-c35d17bba059?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1536408157291-aef6d736e2cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1735&q=80',
            'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
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
        width: width/3,
        height: height/2,
        aspectRatio: 3/2
    }
};
