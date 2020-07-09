
import moment from "moment";
import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { api, serviceapi } from "../../../api/api";
import { Header, Avatar, Card  } from 'react-native-elements'
class studentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      name: this.props.navigation.state.params.Name,
      listStudent: {},
    };
   this.componentDidMount;
  }

  getstudent = async () => {
    try {
      const response = await fetch(
        serviceapi + "student/" + this.props.navigation.state.params.student + "/detail",
        {
          method: "GET"
        }
      );  
      const sresponse = await response.json();
      if (sresponse.student.length > 0) {
        await this.setState({
          listStudent:  sresponse.student[0]
        });
      }
      else {
        await this.setState({
          listStudent:  null
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.getstudent();
  }

  backtoPage = () => {
    this.props.navigation.pop();
};

  render() {
    const { listStudent} = this.state;

    return (
      <View style={styles.body}>
        <Header 
              containerStyle={{ paddingBottom:25 }}
              leftComponent={
                  <TouchableOpacity onPress={() => this.backtoPage()}>
                        <Image source={require("../../../image/left.png")}/>
                  </TouchableOpacity>}
              centerComponent={<Text style={{ alignItems: "center"}}> Thông tin sinh viên : {this.state.name} </Text>}
            />
       
       <View style={{ height: 200, marginTop:50, alignContent: 'center', textAlign: 'center', alignSelf:'center', }}>
            <Avatar
                size="xlarge"
                rounded
                activeOpacity={0.7}
                source={listStudent.Image ? {uri: `${api}`+ listStudent.Image } : require("../../../image/image.jpg")}
                />  
        </View>
         <Card title="Thông tin chi tiết">

            <View style={styles.user}>
            <Text style={styles.user}> Tên sinh viên : {listStudent.Frist_Name ? listStudent.Frist_Name : ' '}{listStudent.Last_Name ? listStudent.Last_Name : ' '} </Text>
            </View>
            <View style={styles.user}>
                <Text style={styles.user}>Địa chỉ : {listStudent.Address ? listStudent.Address : ' '}</Text>
            </View> 
            <View style={styles.user}>
                <Text style={styles.user}>Ngày sinh : {listStudent.Brithday ? moment(listStudent.Brithday).format("DD/ MM/ YYYY") : ' '}</Text>
            </View>  
            <View style={styles.user}>
                <Text style={styles.user}>Lớp : {listStudent.learnclass ? listStudent.learnclass.Title : ' '}</Text>
            </View>    
            <View style={styles.user}>
                <Text style={styles.user}>Khoa: {listStudent.learnclass ? listStudent.learnclass.specailized.Title : ' '}</Text>
            </View>
        </Card>   
      </View >
    );
  }
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#f5f5f0",
  },
  user: {
    textAlign: 'center', 
    alignContent:'center'
}

});
export default studentDetail;
