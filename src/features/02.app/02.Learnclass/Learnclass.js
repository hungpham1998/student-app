import React, { Component } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import moment from "moment";
import { serviceapi } from "../../../api/api";
import { Header,   } from 'react-native-elements'

class FlatListItem extends Component {
  studentid = () => {
    let code = this.props.item.Id;
    this.props.navigation.navigate("StudentinClass", { code });
  };
  
  Specailized = () => {
    let specailizedId = this.props.item.specailizedId;
    this.props.navigation.navigate("Specailized", { specailizedId });
  };

  render() {
    return (
      <View 
        keys= {this.props.item.Id}
        style={{
          flex: 1,
          alignContent:'space-around',
          margin: 10,
          heigt: 200,
          padding:20,
          alignItems:'center',
          backgroundColor: "white",
          borderRadius: 15,
          flexDirection: 'row'
        }}
      >
        <View style={{ flexDirection: "column", width: '50%',paddingEnd:10,alignItems:'center'}}>
            <Text style={{ paddingBottom: 10}}>Khoa:</Text>
            <Text>Tên lớp học : </Text>
          </View>
          <View style={{ flexDirection: "column",alignItems:'center' }}>
            <Text onPress={this.Specailized} style={{ paddingBottom: 10,color:'#66b3ff'}} > {this.props.item.specailized.Title}</Text>
            <Text onPress={this.studentid} style={{color:'#66b3ff'}}>{this.props.item.Title}</Text>
          </View>
      </View>
    );
  }
}

class Learnclass extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../image/employee.png")}
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
      status: false,
      listdata: []
    };
    this.componentDidMount;
  }

  data = async () => {
    try {
      const response = await fetch(serviceapi + "learnclass", {
        method: "get"
      });
      const sresponse = await response.json();
      this.setState({
        listdata: sresponse.learnclass
      });
    } catch (error) {}
  };

  componentDidMount() {
    this.data();
  }

  render() {
    const listdata = this.state.listdata;
    return (
      <View style={styles.body}>
       <Header 
              containerStyle={{ paddingBottom:20 }}
              centerComponent={<Text style={{ alignItems: "center"}}> Danh sách lớp học </Text>}
            />
        <View>
          <FlatList
            data={listdata}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} {...this.props} />;
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F3F3F3'
  }
});

export default Learnclass;
