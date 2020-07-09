import React, { Component } from "react";
import { Image, StyleSheet, View , AsyncStorage, Text,TouchableOpacity} from "react-native";
import axios from "axios";
import SwiperComponent from "./Slideshow";
import { serviceapi, api } from "../../../api/api";
import { Header} from 'react-native-elements'
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
      UserName: '',
      Image: '',
      status: false,
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?earth",
        "https://source.unsplash.com/1024x768/?tree"
      ]
    };
    this.componentDidMount;
  }

  data = async () => {
    try {
      const value = await AsyncStorage.getItem('USERID');
      const response = await axios({ method: "GET", url: `${serviceapi}account/${value}` });
      if (response.data.Account.length > 0) {
        await this.setState({
           UserName: response.data.Account[0].UserName,
           Image: response.data.Account[0].Image
          });
      }
      else {
        this.setState({
          UserName: '',
          Image: ''
        });
      }
    } catch (error) {
      console.warn(error)
    }
  };

  componentDidMount() {
    this.data();
  }

  account = () => {
    this.props.navigation.navigate('AccountDetail');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
              containerStyle={{height: 100, }}
               centerComponent={<Text> Chào mừng : {this.state.UserName !== ' ' ? this.state.UserName : ' '}</Text>}
                rightComponent={<TouchableOpacity onPress={this.account}>
                <Image source={this.state.Image !== ' ' ? { uri: `${api}`+ this.state.Image  }: require("../../../image/image.jpg")}
                  style={{ width: 60, height: 60, borderRadius: 30,  paddingEnd: 10 }} />
            </TouchableOpacity>}
            />
        <View style={{ height: 300}}>
          <SwiperComponent />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
