
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

class StudentPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      name: this.props.navigation.state.params.Name,
      accumulation: 0, 
      countCreaditNumber:0,
      listStudentPoint: [],
    };
   this.componentDidMount;
  }


  getstudentPoint = async () => {
    try {
      const response = await fetch(
        serviceapi + "student/" + this.props.navigation.state.params.student + "/point",
        {
          method: "GET"
        }
      );  
      const sresponse = await response.json();
      if (sresponse.Student.student.length > 0) {
        await this.setState({
          accumulation: sresponse.Student.accumulation,
          countCreaditNumber:sresponse.Student.countCreaditNumber,
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
    this.getstudentPoint();
  }

  backtoPage = () => {
    this.props.navigation.pop();
};

  render() {
    const {  listStudentPoint } = this.state;

    return (
      <View style={styles.body}>
        <Header 
              containerStyle={{ paddingBottom:25 }}
              leftComponent={
                  <TouchableOpacity onPress={() => this.backtoPage()}>
                        <Image source={require("../../../image/left.png")}/>
                  </TouchableOpacity>}
              centerComponent={<Text style={{ alignItems: "center"}}>  sinh viên : {this.state.name} </Text>}
            />
       
        <View style={{height: '80%' }}>
         
            {listStudentPoint !== null ? (
              <View style={{ marginTop: 10, alignItems:'center'}}  >
                <Text > Thông tin bảng điểm sinh viên: {this.state.name} </Text>
                <View>
                  <View style={{
                    //backgroundColor: '#66ccff',
                    flexDirection: "row",
                    marginBottom: 10,
                    marginTop: 10,
                    padding: 5, 
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
              : <Text style={{textAlign:'center' , color: " #ff3300"}}></Text>}
        </View>
         <View style={{ height: '20%',   flexDirection: "row", textAlign: 'center', alignSelf: 'center'}} >
                <Text style={{  flexDirection: "column"}}> Điểm tích lũy: {this.state.accumulation}</Text>
                <Text  style={{  flexDirection: "column"}}> Tổng số tín chỉ: {this.state.countCreaditNumber}</Text>
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
export default StudentPoint;


class FlatListPoint extends Component {

  render() {
    return (
        <View style={{ backgroundColor: 'white', flexDirection: "row", padding: 5, margin: 5, }}>
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
