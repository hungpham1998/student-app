import React, { Component } from "react";
import { Image, StyleSheet, View , AsyncStorage, Text,TouchableOpacity} from "react-native";
import axios from "axios";
import { serviceapi, api } from "../../../api/api";
import { Header, Avatar, Card  } from 'react-native-elements'

export default class AccountDetail  extends Component {

  constructor(props) {
    super(props);
    this.state = {
         Account: {},
      status: false,
   
    };
    this.componentDidMount;
  }

  data = async () => {
    try {
      const value = await AsyncStorage.getItem('USERID');
      const response = await axios({ method: "GET", url: `${serviceapi}account/${value}` });
        if (response.data.Account.length > 0) {
            await this.setState({  Account: response.data.Account[0]});
      }
      else {
        this.setState({
            Account: {}
        });
      }
    } catch (error) {
      console.warn(error)
    }
  };

  componentDidMount() {
    this.data();
  }

  backtoPage = () => {
    this.props.navigation.pop();
};
    render() {
        const { Account } = this.state;
    return (
      <View style={styles.container}>
        <Header 
                containerStyle={{ height: 100, }}
                leftComponent={
                    <TouchableOpacity onPress={() => this.backtoPage()}>
                         <Image source={require("../../../image/left.png")}/>
                    </TouchableOpacity>}
                centerComponent={<Text> Thông tin  : {Account.UserName?Account.UserName: ' '} </Text>}
            />
        <View style={{ height: 200, marginTop:50, alignContent: 'center', textAlign: 'center', alignSelf:'center', }}>
            <Avatar
                size="xlarge"
                rounded
                activeOpacity={0.7}
                source={Account.Image ? {uri: `${api}`+ Account.Image } : require("../../../image/image.jpg")}
                />  
                <Text style={{   textAlign: 'center',  }}> {Account.UserName ? Account.UserName : ' '} </Text>
        </View>
         <Card title="Thông tin chi tiết">

            <View style={styles.user}>
                <Text style={styles.user}> Tên đăng nhập : {Account.Account ? Account.Account : ' '}</Text>
            </View>
            <View style={styles.user}>
                <Text style={styles.user}>Địa chỉ : {Account.Address ? Account.Address : ' '}</Text>
            </View> 
            <View style={styles.user}>
                <Text style={styles.user}>Mail : {Account.Mail ? Account.Mail : ' '}</Text>
            </View>  
            <View style={styles.user}>
                <Text style={styles.user}>Phòng ban : {Account.department ? Account.department.Title : ' '}</Text>
            </View>    
            <View style={styles.user}>
                <Text style={styles.user}>Chức vụ : {Account.position ? Account.position.Title : ' '}</Text>
            </View>
        </Card>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    },
    user: {
        textAlign: 'center', 
        alignContent:'center'
    }
});
