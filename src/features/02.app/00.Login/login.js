import React, { Component } from "react";
import {
  View,
  Image,
  Text,
    StyleSheet,
  // AsyncLocalStorage,
  TouchableOpacity,
  TextInput,
    StatusBar,
    Switch,
  AsyncStorage
} from "react-native";
import RNRestart from 'react-native-restart';
import { serviceapi } from "../../../api/api";
import jwt_decode from 'jwt-decode';
import axios from "axios";

class Login extends Component {
  static navigationOptions = {
    header: null,
    id: ''
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
 login = async () => {
        await  axios({
        method:  "POST",
        url: `${serviceapi}auth/signin`,
        data: {
            Account: this.state.email,
            PassWord: this.state.password
        }})
        .then(async (response) => {
            if (response.data.auth === true) {
                const token = response.data.accessToken;
                const decoded = jwt_decode(token);
                this.setState({
                    checkLogin: false,
                    email: '',
                    password: ''
                })
                    await  AsyncStorage.setItem('USERID',decoded.user.Id);
                    await AsyncStorage.setItem('TOKEN', token);
                    this.props.navigation.navigate('Home');
                    RNRestart.Restart();
            } else {
                console.log('ko thuc hien')
                this.props.navigation.navigate('Login');
                this.setState({
                    checkLogin: true
                })
            }
        })
        .catch(err => {
            console.log("loi", err);
        });
  };
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        checkLogin: false
    };
  }

    render() {
        const { checkLogin } = this.state;
    return (
        <View style={styles.container}>
            <Text style={styles.logo}> sinh viên </Text>
            <Text style={{ marginBottom: 50, color:  checkLogin === true ? '#ff0000': '#000000'   }}>{checkLogin === true ? ("Mời xem lại thông tin đăng nhập") : 'Chào mừng đăng nhập'} </Text>
            <View style={styles.inputView} >
            <TextInput
                style={styles.inputText}
                placeholderTextColor="#003f5c"
                placeholder="Tài khoản"
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={this.handleEmail}
                keyboardType="default"
            />
            </View>
            <View style={styles.inputView} >
            <TextInput
                secureTextEntry
                style={styles.inputText}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#003f5c"
                autoCapitalize="none"
                value={this.state.password}
                onChangeText={this.handlePassword}
                secureTextEntry={true}
                keyboardType="default"
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
                 <Text style={styles.loginText}>LOGIN</Text>
             </TouchableOpacity>
        </View>
    );
  }
}



export default Login;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#87ceeb",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#fffafa",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"black"
    },
    forgot:{
      color:"black",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#1e90ff",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  });
