
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
import { Header,   } from 'react-native-elements'
import { serviceapi } from "../../../api/api";

class StudentAddtend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      name: this.props.navigation.state.params.Name,
      accumulation: 0, 
      countCreaditNumber:0,
      listStudentAttend:[]
    };
   this.componentDidMount;
  }

  getstudentAttend = async () => {
    try {
    //  console.warn(this.props.navigation.state.params.student)
      const response = await fetch(
        serviceapi + "student/" + this.props.navigation.state.params.student + "/attendancesheet",
        {
          method: "GET"
        }
      );
      const sresponse = await response.json();
     // console.warn(sresponse)
      if (sresponse.length > 0) {
        await this.setState({
          listStudentAttend:  sresponse[0].attendancesheets
        });
      }
      else {
        await this.setState({
          listStudentAttend:  null
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

 
  componentDidMount() {
    this.getstudentAttend();
  }

  backtoPage = () => {
    this.props.navigation.pop();
};

  render() {
    const { listStudentAttend } = this.state;

    return (
      <View style={styles.body}>
        <Header 
              containerStyle={{ paddingBottom:25 }}
              leftComponent={
                  <TouchableOpacity onPress={() => this.backtoPage()}>
                        <Image source={require("../../../image/left.png")}/>
                  </TouchableOpacity>}
              centerComponent={<Text style={{ alignItems: "center"}}> sinh viên : {this.state.name} </Text>}
            />
          <View>
            {listStudentAttend !== null ? (
               <View style={{ marginTop: 10, alignItems:'center'}}>
                    <Text > Thông tin điểm danh sinh viên: {this.state.name} </Text>
                <View>
                  <View style={{
                    //backgroundColor: '#66ccff',
                    flexDirection: "row",
                    marginBottom: 10,
                    marginTop: 10,
                    padding: 5}}>
                    <Text style={styles.item}>Ngày điểm danh:</Text>
                    <Text style={styles.item} >Số tiết</Text>
                    <Text  style={styles.item} >Ghi chú:</Text>
                    <Text style={styles.item} >Môn học:</Text>
                    <Text style={styles.item} >Giảng viên:</Text> 
                  </View>
                  <FlatList data={listStudentAttend}
                    renderItem={({ item, index }) => {
                      return <FlatListAttend item={item} index={index} {...this.props} />;
                      }} />
                </View>
              </View>
            )
              : <Text style={{textAlign:'center'}}></Text>}
          </View>
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
  item: {
   width: '20%' 
  },
  point1: {
    width: '10%'
  },
  point2: {
    width: '40%'
  },
  style : {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#fff',
  }
});
export default StudentAddtend;


class FlatListAttend extends Component {
  render() {
    return (
        <View style={{ backgroundColor: 'white', flexDirection: "row", padding: 5, flex:1, marginTop: 5 }}>
            <Text style={styles.item}  >{moment(this.props.item.TimesDate).format("DD/ MM/ YYYY")}</Text>
            <Text  style={styles.item} > {this.props.item.Times}</Text>
            <Text style={styles.item} > {this.props.item.Note} </Text>
            <Text  style={styles.item}> {this.props.item.subject.Title} </Text>
            <Text style={styles.item}>  {this.props.item.account.UserName}  </Text>
       </View>
    );
  }
}
