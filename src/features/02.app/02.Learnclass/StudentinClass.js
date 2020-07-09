import moment from "moment";
import React, { Component } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { serviceapi, api } from "../../../api/api";
import { Header,   } from 'react-native-elements'
class FlatListItem extends Component {

  pointstudent = () => {
    let student = this.props.item.Id;
    let Name = this.props.item.Frist_Name + " " + this.props.item.Last_Name;
    this.props.navigation.navigate("StudentPoint", { student, Name  });
  };
  studentDetail = () => {
    let student = this.props.item.Id;
    let Name = this.props.item.Frist_Name + " " + this.props.item.Last_Name;
    this.props.navigation.navigate("studentDetail", { student, Name  });
  }
  attendstudent = () => {
    let student = this.props.item.Id;
    let Name = this.props.item.Frist_Name + " " + this.props.item.Last_Name;
    this.props.navigation.navigate("StudentAttend", { student, Name  });
  };

  render() {
    return (
        <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "white" ,
          margin: 10,
          borderRadius: 25
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "column"
          }}
        >
          <TouchableOpacity onPress={this.studentDetail}>
            <Image source={this.props.item.Image ? { uri: `${api}`+ this.props.item.Image  }:require("../../../image/image.jpg")}
              style={{ width: 120, height: 120, borderRadius: 55 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            padding: 10
          }}
        >
            <View style={{ paddingTop: 10, paddingBottom: 5, flexDirection: "row"  }}>
              <Text style={{ flexDirection: "column", marginRight: 2 }}>Tên hs:    </Text>
              <TouchableOpacity onPress={this.pointstudent} >
                <Text style={{color:'#66b3ff'}} >{this.props.item.Frist_Name + " " +this.props.item.Last_Name }</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
                    <Text style={{ flexDirection: "column",  marginRight: 2 }}>Địa chỉ:</Text>
                <Text style={{ flexDirection: "column" }}> {this.props.item.Adress}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ flexDirection: "column", marginRight: 2 }}>Mail:</Text>
                <Text style={{ flexDirection: "column" }}> {this.props.item.Mail} </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ flexDirection: "column", marginRight: 2 }}>Ngày sinh:</Text>
                <Text  style={{ flexDirection: "column" }}> {moment(this.props.item.Birthday).format("DD/ MM/ YYYY")} </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ flexDirection: "column", marginRight: 2 }}>Mã:</Text>
                <Text style={{ flexDirection: "column" }}>
                    {this.props.item.Code}
                </Text>
            </View>
           <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={this.pointstudent} >
                  <Text style={{ flexDirection: "column", marginRight: 2 }}>Bảng điểm </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.attendstudent} >
                <Text style={{ flexDirection: "column" }}> Điểm danh</Text>
              </TouchableOpacity>
            </View>
            </View>
         </View>
    );
  }
}

export default class StudentinClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
        title: ' ',
        listStudent: []
    };
  }

    data = async () => {
    try {
      const response = await fetch(
        serviceapi + "learnclass/" + this.props.navigation.state.params.code+ '/student',
        {
          method: "GET"
        }
      );
      const sresponse = await response.json();
      this.setState({
          title: sresponse[0].Title,
          listStudent: sresponse[0].students
      });
    } catch (error) {}
  };

    componentDidMount() {
        this.data();
    }

    backtoPage = () => {
        this.props.navigation.pop();
    };
 
    render() {
        const listStudent = this.state.listStudent;
        const title = this.state.title;
    return (
        <View style={styles.body}>
            <Header 
                leftComponent={
                    <TouchableOpacity onPress={() => this.backtoPage()}>
                         <Image source={require("../../../image/left.png")}/>
                    </TouchableOpacity>}
                centerComponent={ <Text style={{ alignItems: "center"}}> Danh sách sinh viên lớp : {title}</Text>}
            />
            <FlatList
                data={listStudent}
                scrollEnabled={true}
                renderItem={({ item, index }) => {
                return <FlatListItem item={item} index={index} {...this.props} />;}}
            />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: "#F3F3F3",
        alignContent: "center",
    },
    conten: {
        flexDirection: "row",
        paddingBottom: 10
    },
    conten_left: {},
    conten_right: {
        paddingLeft: 10
    }
});
