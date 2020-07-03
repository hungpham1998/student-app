import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={true}
        autoplayTimeout={5}
      >
        <View>
          <Image
            source={require('../../../image/epu3.png')}
            style={styles.img}
          />
        </View>
        <View>
          <Image
            source={require('../../../image/epu2.png')}
            style={styles.img}
          />
        </View>
        <View>
          <Image
            source={require('../../../image/epu1.png')}
            style={styles.img}
          />
        </View>
        <View>
          <Image
            source={require('../../../image/epu4.png')}
            style={styles.img}
          />
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  img: {
    width: "100%",
    height: "100%"
  }
});
