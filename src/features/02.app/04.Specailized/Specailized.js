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
            <Text>Tên lớp học : </Text>
          </View>
          <View style={{ flexDirection: "column",alignItems:'center' }}>
            <Text onPress={this.studentid} style={{color:'#66b3ff'}}>{this.props.item.Title}</Text>
          </View>
      </View>
    );
  }
}

class Specailized extends Component {
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
        title:'',
        listdata: []
    };
    this.componentDidMount;
  }

    data = async () => {
    try {
      const response = await fetch(serviceapi + "specailized/" + this.props.navigation.state.params.specailizedId + "/learnclass", {
        method: "get"
      });
        const sresponse = await response.json();
        if (sresponse.length > 0) {
            await this.setState({
                title: sresponse[0].Title, 
                listdata: sresponse[0].learnclasses
          });
        }
        else {
            await this.setState({
                title: ' ', 
                listdata: null
          });
        }
    } catch (error) {}
  };

  componentDidMount() {
    this.data();
  }

    
  backtoPage = () => {
    this.props.navigation.pop();
};
    
  render() {
    const listdata = this.state.listdata;
    return (
        <View style={styles.body}>
          <Header 
                containerStyle={{height: 100, paddingTop:20 }}
                leftComponent={
                    <TouchableOpacity onPress={() => this.backtoPage()}>
                         <Image source={require("../../../image/left.png")}/>
                    </TouchableOpacity>}
                centerComponent={  <Text> Thông tin danh sách lớp học thuộc khoa:  {this.state.title}  </Text>}
            />
        <View>
            {listdata !== null ?
                (<FlatList
                    data={listdata}
                    renderItem={({ item, index }) => {
                    return <FlatListItem item={item} index={index} {...this.props} />;
                        }} />) :
                (
                    <Text> Không có dữ liệu</Text>    
            )}
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

export default Specailized;
