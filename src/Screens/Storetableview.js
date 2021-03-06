import React, { Component } from 'react';

import {
  Text, StyleSheet, View, FlatList, TextInput, ActivityIndicator,
  Alert, Image, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from 'react-native-whc-loading'
import CardView from 'react-native-cardview';
import moment from 'moment-timezone'
import AsyncStorage from "@react-native-community/async-storage";
//import { TouchableHighlight } from 'react-native-gesture-handler';


export default class Storetableview extends Component {

//   static navigationOptions = ({ navigate, navigation }) => ({
//     headerTitle: (
//       <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
//         <Image source={require('../images/poslogo.jpg')}
//           style={{ height: 100, width: 100, marginRight: 20, resizeMode: 'contain' }} />
//       </View>
//     ),
//     headerRight: <TouchableOpacity onPress={() => { navigation.navigate('Notifications'); }}>
//       <FontAwesome name="bell" size={25} color="#16a0db" /></TouchableOpacity>,
//   })

  constructor(props) {

    super(props);

    this.state = {

      isLoading: true,
      text: '',
      num: ''

    }

    this.arrayholder = [];
  }

  componentDidMount() {

    var date = moment()

      .format("MM-DD-YYYY");
    //this.timer = setInterval(()=> this.loginWithToken(), 1000)
    AsyncStorage.getItem('token').then((data) => {
      if (data) {

        return fetch(API_BASE_URL + `me_new_date?token=${encodeURIComponent(data)}&date=${date}`)
          .then((response) => response.json())
          .then((responseJson) => {
            //this.refs.loading.show(false);
            // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({
              isLoading: false,
              dataSource: responseJson.user.stores,
            }, function () {

              // In this block you can do something with new state.
              this.arrayholder = responseJson.user.stores;

            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })

  }

   GetListViewItem = async(name, voids, sales, deletes, SID, tax, paid_out, returns, No_Sales, isnewdatabase)=> {
            
    const selectedStoreDetails ={
      'Storename':name,
      'void':voids,
      'Sid':SID,
      'sales':sales,
      'deletes':deletes,
      'tax':tax,
      'paid_out':paid_out,
      'returns':returns,
      'No_Sales':No_Sales,

    }

    AsyncStorage.setItem('selectedStoreDetails',JSON.stringify(selectedStoreDetails))


    // let x= await AsyncStorage.getItem("Sid")
    // const { Storename } = x.storeDetails;

    // console.log(JSON.stringify(x));
 
    // AsyncStorage.setItem("Storename",name);
    // AsyncStorage.setItem('void', JSON.stringify(voids));
    // AsyncStorage.setItem('Sid', JSON.stringify(SID));
    // AsyncStorage.setItem('sales', sales);
    // AsyncStorage.setItem('deletes', JSON.stringify(deletes));
    // AsyncStorage.setItem('tax', tax);
    // AsyncStorage.setItem('paid_out', paid_out);
    // AsyncStorage.setItem('returns', returns);
    // AsyncStorage.setItem('No_Sales', No_Sales);
    showcategary = isnewdatabase;

    // console.log(AsyncStorage.getItem("Sid"))
    //alert(tax)
    //getReactNativeHost().getReactInstanceManager().getDevSupportManager().handleReloadJS();
    this.props.navigation.navigate('Dashboard');

  }

  SearchFilterFunction(text) {

    // alert(text);


    const newData = this.arrayholder.filter(function (item) {



      //   const itemData = item.name;
      //   const textData = text
      //   return itemData.indexOf(textData) > -1

      // }

      const searchItem = item.SID.toString() + item.name;
      return searchItem.indexOf(text) > -1;

    })
    this.setState({
      dataSource: newData,
      text: text,
      //number: number
    })
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>

        <TextInput
          style={styles.TextInputStyleClass}
          onChangeText={(text, number) => this.SearchFilterFunction(text, number)}
          value={this.state.text}
          underlineColorAndroid='transparent'
          placeholder="Search Here"
        />





        <FlatList


            data={this.state.dataSource}

          //renderSeparator= {this.ListViewItemSeparator}

          renderItem={({item}) =>
            // <TouchableHighlight underlayColor='gray' onPress={this.GetListViewItem.bind(this, item.name,
            //   item.voids, item.sales, item.deletes,item.SID,item.tax,
            //   item.paid_out,item.returns)}>

            <TouchableHighlight underlayColor='gray' onPress={() => this.GetListViewItem(
              item.name, 
              item.voids, item.sales,
              item.deletes, item.SID, item.tax,
              item.paid_out,
              item.returns, item.No_Sales, item.isnewdatabase
              )}>
              <View style={styles.rowViewContainer}>

                <CardView
                  cardElevation={3}
                  cardMaxElevation={1}
                  cornerRadius={0}
                  style={styles.cardd}>

                  <View flexDirection='row'>
                    <Text style={{ color: '#000', fontWeight: '300', fontSize: 15 }}>{item.name}
                    </Text>


                    <Text style={{ color: '#000', fontWeight: '300', fontSize: 15, }}>[{item.SID}]
             </Text>
                  </View>

                </CardView>
              </View>
            </TouchableHighlight>









          }


        //   enableEmptySections={true}

          style={{ marginTop: 10 }}

        />

        <Loading />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',

    backgroundColor: '#fff'

  },

  rowViewContainer: {
    fontSize: 17,
    padding: 10
    //paddingLeft :10, 
    //paddingRight :10, 
  },

  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7,
    marginTop: 10,
    backgroundColor: "#f2f2f2"

  },
  cardd: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 40,
    marginTop: 0,

    width: '100%',

  },

});