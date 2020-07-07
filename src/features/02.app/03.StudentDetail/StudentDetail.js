
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

import { serviceapi } from "../../../api/api";

class studentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      name: this.props.navigation.state.params.Name,

      listStudentPoint: [],
      listStudentAttend:[]
    };
   this.componentDidMount;
  }

  getstudentAttend = async () => {
    try {
      const response = await fetch(
        serviceapi + "student/" + this.props.navigation.state.params.student + "/attendancesheet",
        {
          method: "GET"
        }
      );
      const sresponse = await response.json();
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

  getstudentPoint = async () => {
    try {
      const response = await fetch(
        serviceapi + "student/" + this.props.navigation.state.params.student + "/point",
        {
          method: "GET"
        }
      );  
      const sresponse = await response.json();
      console.warn(sresponse.Student)
      if (sresponse.Student.student.length > 0) {
        await this.setState({
          listStudentPoint:  sresponse.Student.student[0].pointstudents
        });
      }
      else {
        await this.setState({
          listStudentPoint:  null
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.getstudentAttend();
    this.getstudentPoint();
  }

  backtoPage = () => {
    this.props.navigation.pop();
};

  render() {
    const { listStudentAttend, listStudentPoint } = this.state;
    return (
      <View style={styles.body}>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View style={{ flexDirection: "column",  paddingRight: 35 }}>
            <TouchableOpacity onPress={() => this.backtoPage()}>
                <Image source={require("../../../image/left.png")}/>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "column" }}> 
              <Text style={{ alignItems: "center"}}> sinh viên : {this.state.name} </Text>
          </View>
        </View>
        <View>
          <View style={{ height: '40%' }}>
            {listStudentPoint !== null ? (
              <View style={{ marginTop: 10, alignItems:'center'}}  >
                <Text > Thông tin bảng điểm sinh viên: {this.state.name} </Text>
                <View>
                  <View style={{
                    backgroundColor: '#66ccff',
                    flexDirection: "row",
                    marginBottom: 10,
                    marginTop: 10,
                    padding: 5
                  }}>
                    <Text style={styles.point1}>ĐiểmKT1</Text>
                    <Text style={styles.point1} >ĐiểmKT2</Text>
                    <Text  style={styles.point1} >ĐiểmGK</Text>
                    <Text style={styles.point1} >ĐiểmCC</Text>
                    <Text style={styles.point1} >ĐiểmT</Text> 
                    <Text style={styles.point1} >ĐiểmTk</Text> 
                    {/* <Text style={styles.point1} >ĐiểmT</Text>  */}
                    <Text style={styles.point2} >Môn</Text> 
                  </View>
                  <FlatList data={listStudentPoint}
                  renderItem={({ item, index }) => {
                    return <FlatListPoint item={item} index={index} {...this.props} />;
                    }} />
                </View>
              </View>
            )
              : <Text style={{textAlign:'center' , color: " #ff3300"}}> Không có dữ liệu điểm </Text>}
          </View>
          <View style={{ height: '40%' }}>
            {listStudentAttend !== null ? (
              <View style={{ marginTop: 10, alignItems:'center'}}  >
                <Text > Thông tin điểm danh sinh viên: {this.state.name} </Text>
                <View>
                  <View style={{
                    backgroundColor: '#66ccff',
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
              : <Text style={{textAlign:'center'}}> Không có dữ liệu điểm danh</Text>}
          </View>
          <View style={{ height: '20%' }} >
             
          </View>
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
});
export default studentDetail;


class FlatListAttend extends Component {
  render() {
    return (
        <View style={{ backgroundColor: 'white', flexDirection: "row", padding: 5  }}>
            <Text style={styles.item}  >{moment(this.props.item.TimesDate).format("DD/ MM/ YYYY")}</Text>
            <Text  style={styles.item} > {this.props.item.Times}</Text>
            <Text style={styles.item} > {this.props.item.Note} </Text>
            <Text  style={styles.item}> {this.props.item.subject.Title} </Text>
            <Text style={styles.item}>  {this.props.item.account.UserName}  </Text>
       </View>
    );
  }
}

class FlatListPoint extends Component {

  render() {
    return (
        <View style={{ backgroundColor: 'white', flexDirection: "row", padding: 5  }}>
            <Text style={styles.point1}  >{this.props.item.PointKT1}</Text>
            <Text  style={styles.point1} > {this.props.item.PointKT2}</Text>
            <Text style={styles.point1} > {this.props.item.PointGK} </Text>   
            <Text  style={styles.point1}> {this.props.item.PointCC} </Text>
            <Text style={styles.point1}>  {this.props.item.PointT}  </Text>
            <Text style={styles.point1}>  {this.props.item.PointTK}  </Text>
            <Text style={styles.point2}>  {this.props.item.subject.Title}  </Text>
       </View>

    );
  }
}
