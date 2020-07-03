import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { actFetchLearnclassRequest } from '../redux/action/learnclass';


class FlatListClass extends Component {
    render() {
        if (this.props.index) {
            return (
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black" }} numberOfLines={1}>
                        {this.props.item.Title}
                    </Text>
                    <Text  style={{ color: "black" }} numberOfLines={1}>
                         {this.props.item.specailized.Title}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: "#FFA53F",
                            fontSize: 30,
                            lineHeight: 20
                        }}
                    >
                         {this.props.item.Note}
                 </Text>
            </View>
            );
        } else {
            return <View />;
        }
    }
};
    


 class Learnclass extends Component {
    state = {
        page: 1,
      };
    
      Loadmore = () => {
        this.setState({page: page + 1}, this.props.loadmore);
        // this.props.getLearnclass();
     };
     
     async componentDidMount() {
      await this.props.getLearnclass();
     }
     
   render() {
     const { learnclass } = this.props;
     console.warn(learnclass)
        return (
            <View>
                <TouchableOpacity style={styles.loadmore} onPress={this.Loadmore}>
                {/* <FlatList
                    data={learnclass}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item, index }) => {
                    return <FlatListClass item={item} index={index} />;
                    }}
                /> */}
                <Text style={styles.txtload}>Load More</Text>
              </TouchableOpacity>
            </View>
        )
    }
}


const mapStatetoProps = state => {
    return {
     learnclass : state.learnclass
    };
  };
  const mapDispatToProps = dispatch => {
    return {
      getLearnclass: () => dispatch(actFetchLearnclassRequest())
    };
  };
  export default connect(
    mapStatetoProps,
    mapDispatToProps
)(Learnclass);
  
  const styles = StyleSheet.create({
    item: {
      padding: 10,
      borderBottomColor: "#CCCCCC",
      borderTopColor: "#CCCCCC",
      borderBottomWidth: 0.5,
      borderTopWidth: 0.5,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    txt: {
      fontSize: 16,
      maxWidth: "50%"
    },
    loadmore: {
      marginTop: 10,
      width: "100%",
      height: 40,
      borderRadius: 7,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      backgroundColor: "#5A8F73",
      justifyContent: "center",
      alignItems: "center"
    },
    txtload: {
      color: "white",
      fontSize: 16
    },
   
    
  });
