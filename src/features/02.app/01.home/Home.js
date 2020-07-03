import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";

import SwiperComponent from "./Slideshow";

export default class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../image/home.png")}
        style={{
          width: 30,
          height: 30,
          tintColor
        }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?earth",
        "https://source.unsplash.com/1024x768/?tree"
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <SliderBox
          images={this.state.images}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
        /> */}
        <View style={{ height: 300, marginTop: 30 }}>
          <SwiperComponent />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
